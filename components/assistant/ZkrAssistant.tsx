"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, X } from "lucide-react";
import BmoPortrait from "@/components/assistant/BmoPortrait";
import {
  BMO_FACES,
  getFaceForTopic,
  getNextFace,
  LISTENING_FACE,
  ERROR_FACE,
  type BmoFace,
} from "@/lib/assistant/bmoFaces";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  answerQuestion,
  answerTopic,
  errorMessage,
  welcomeMessage,
  type AssistantLocale,
  type FollowUp,
  type Topic,
} from "@/lib/assistant/engine";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  /** Welcome messages are rendered from the CURRENT site language, so they follow a language switch. */
  kind?: "welcome";
  text?: string;
  /** Language of an assistant reply — follow-up chips answer in it. */
  locale?: AssistantLocale;
  followUps?: FollowUp[];
};

const EASE = [0.16, 1, 0.3, 1] as const;
const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
const LINK_TOKEN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
const LABEL_LINE = /^([^:\n]{2,22}?)\s?:\s(.+)$/;

function localeToAssistantLocale(locale: string): AssistantLocale {
  return locale === "fr" || locale === "es" ? locale : "en";
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}-${Date.now()}`;
}

/** Makes the email address and https URLs that the engine quotes from the profile clickable. */
function linkify(text: string): ReactNode[] {
  return text.split(LINK_TOKEN).map((part, i) => {
    if (i % 2 === 0) return part;
    const isEmail = !part.startsWith("http");
    return (
      <a
        key={i}
        href={isEmail ? `mailto:${part}` : part}
        {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="break-all underline decoration-brand decoration-1 underline-offset-2 transition-colors hover:text-accent"
      >
        {part}
      </a>
    );
  });
}

/** "Label: value" lines get a stronger label; everything else is plain text. */
function MessageText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const match = line.match(LABEL_LINE);
        return (
          <span key={i} className="block">
            {match ? (
              <>
                <span className="font-medium text-text">{match[1] ?? ""}:</span> {linkify(match[2] ?? "")}
              </>
            ) : (
              linkify(line)
            )}
          </span>
        );
      })}
    </>
  );
}

export default function ZkrAssistant() {
  const { t, tList, locale } = useTranslation();
  const siteLocale = localeToAssistantLocale(locale);
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: "welcome", role: "assistant", kind: "welcome" }]);
  const [input, setInput] = useState("");
  const [lastTopic, setLastTopic] = useState<Topic | "fallback">("greeting");
  const [customFace, setCustomFace] = useState<BmoFace | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const activeFace = customFace ?? (
    input.trim().length > 0
      ? LISTENING_FACE
      : getFaceForTopic(lastTopic)
  );

  const cycleFace = useCallback(() => {
    setCustomFace((prev) => getNextFace((prev ?? activeFace).filename));
  }, [activeFace]);

  const suggestions = tList("assistant.suggestions");
  const lastMessage = messages[messages.length - 1];
  // Starter questions before the first exchange; afterwards the last reply's follow-ups.
  const showStarters = messages.length === 1;
  const followUps = !showStarters && lastMessage?.role === "assistant" ? (lastMessage.followUps ?? []) : [];

  const closePanel = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  // Escape, focus trap, outside-click, body scroll lock on mobile, focus the input on open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closePanel();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      const inside = panelRef.current.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    }

    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      closePanel(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const previousOverflow = document.body.style.overflow;
    if (isMobile) document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 150);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, closePanel]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, reduceMotion]);

  /** The engine is local and synchronous, so answers appear instantly — no artificial "typing" delay. */
  function push(userText: string, reply: () => ReturnType<typeof answerQuestion>) {
    let answer: ReturnType<typeof answerQuestion> | null = null;
    try {
      answer = reply();
    } catch {
      /* falls through to the localized error message */
    }
    setCustomFace(null);
    if (answer) {
      setLastTopic(answer.topic);
    } else {
      setLastTopic("fallback");
      setCustomFace(ERROR_FACE);
    }
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: userText },
      answer
        ? { id: nextId(), role: "assistant", text: answer.text, locale: answer.locale, followUps: answer.followUps }
        : { id: nextId(), role: "assistant", text: errorMessage(siteLocale), locale: siteLocale },
    ]);
    // Keep typing flow on desktop; on touch screens don't pop the keyboard back up after a chip tap.
    if (!window.matchMedia("(pointer: coarse)").matches) inputRef.current?.focus();
  }

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");
    // The site language only breaks ties; the question's own language wins.
    push(trimmed, () => answerQuestion(trimmed, siteLocale));
  }

  function askFollowUp(f: FollowUp, replyLocale: AssistantLocale) {
    push(f.label, () => answerTopic(f.topic, replyLocale));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const chipClass =
    "flex min-h-[44px] items-center rounded-full border border-border-strong px-[14px] py-[6px] text-left text-[13px] text-text-dim transition-colors hover:border-accent hover:text-accent sm:min-h-0 sm:px-[12px] sm:text-[12.5px] [@media(pointer:coarse)]:!min-h-[44px]";

  return (
    <>
      {/* Floating BMO Character Launcher */}
      <div
        className={cn(
          "fixed z-[1300] transition-[opacity,transform] duration-300",
          "bottom-20 right-3 sm:bottom-[100px] sm:right-7",
          open && "invisible opacity-0 pointer-events-none"
        )}
      >
        <motion.button
          ref={buttonRef}
          type="button"
          data-cursor="CHAT"
          aria-label={t("assistant.openLabel")}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="zkr-assistant-panel"
          onClick={() => setOpen(true)}
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -9 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          className="group relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-xl"
        >
          {/* Speech bubble indicator */}
          <div className="absolute -top-7 right-1/2 translate-x-1/2 whitespace-nowrap rounded-full border border-border-strong bg-surface/95 px-2.5 py-0.5 text-[10.5px] font-mono font-medium text-text shadow-sm backdrop-blur-sm pointer-events-none flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-105">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>Ask BMO</span>
          </div>

          {/* Full BMO Character */}
          <div className="relative drop-shadow-[0_14px_22px_rgb(var(--shadow)/0.35)]">
            <BmoPortrait size="character" face={activeFace} interactive={false} />
          </div>

          {/* Grounding Shadow */}
          <motion.div
            aria-hidden
            animate={reduceMotion ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.22, 0.35] }}
            transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
            className="mt-1 h-2 w-3/4 rounded-full bg-black/30 dark:bg-black/60 blur-[3px]"
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Phone scrim — closes the panel on tap and keeps the page underneath from scrolling/interacting */}
            <motion.div
              aria-hidden
              data-testid="assistant-scrim"
              onClick={() => closePanel()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[1290] bg-bg/70 sm:hidden"
            />

            <motion.div
              id="zkr-assistant-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${t("assistant.title")} — ${t("assistant.subtitle")}`}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={cn(
                "fixed z-[1295] flex flex-col overflow-hidden border border-border bg-surface shadow-[0_24px_48px_-24px_rgb(var(--shadow)/0.4)]",
                // Phones: full-width bottom sheet with 12px side margins; dvh tracks the collapsing URL bar.
                "inset-x-3 bottom-3 h-[min(76dvh,580px)] w-auto rounded-lg",
                // sm and up: compact card anchored in the bottom right corner.
                "sm:inset-x-auto sm:bottom-6 sm:left-auto sm:right-7 sm:h-[min(580px,calc(100dvh-120px))] sm:w-[390px] sm:rounded-xl",
                // Short viewports (landscape phones): full-height side sheet.
                "[@media(max-height:520px)]:!bottom-3 [@media(max-height:520px)]:!h-[calc(100dvh-1.5rem)]"
              )}
            >
              {/* Header with Prominent BMO Companion Stage */}
              <div className="flex items-center justify-between gap-3 border-b border-border bg-bg/50 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-xs">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="relative rounded-lg bg-accent/8 p-1 border border-accent/20 shadow-inner shrink-0">
                    <BmoPortrait
                      size="header"
                      face={activeFace}
                      interactive
                      onCycleFace={cycleFace}
                      ariaLabel="BMO companion — click to change expression"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[15px] sm:text-[16px] font-semibold text-text">
                        {t("assistant.title")}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[9.5px] font-mono font-bold text-accent uppercase tracking-wider">
                        BMO
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate font-mono text-[11px] font-medium text-text-dim">
                        {activeFace.label}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={cycleFace}
                      className="mt-0.5 text-left font-mono text-[9.5px] text-accent hover:underline cursor-pointer"
                    >
                      Click BMO to change mood ({BMO_FACES.findIndex((f) => f.id === activeFace.id) + 1}/30)
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={t("assistant.closeLabel")}
                  onClick={() => closePanel()}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-dim transition-colors hover:border-accent hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              {/* Messages — a polite live region so screen readers announce each new answer */}
              <div
                ref={listRef}
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label={`${t("assistant.title")} — ${t("assistant.subtitle")}`}
                className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    data-testid="chat-message"
                    data-role={message.role}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[90%] space-y-1 break-words rounded-md px-[14px] py-[10px] text-[14px] leading-relaxed sm:max-w-[88%] sm:text-[13.5px]",
                        message.role === "user"
                          ? "bg-accent text-bg"
                          : "border border-border bg-bg text-text-dim"
                      )}
                    >
                      {message.kind === "welcome" ? (
                        welcomeMessage(siteLocale)
                      ) : message.role === "assistant" ? (
                        <MessageText text={message.text ?? ""} />
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                ))}

                {(showStarters ? suggestions.length > 0 : followUps.length > 0) && (
                  <div role="group" aria-label={t("assistant.suggestionsLabel")} className="flex flex-wrap gap-2 pt-1">
                    {showStarters
                      ? suggestions.map((s) => (
                          <button key={s} type="button" onClick={() => ask(s)} className={chipClass}>
                            {s}
                          </button>
                        ))
                      : followUps.map((f) => (
                          <button
                            key={f.topic}
                            type="button"
                            data-followup={f.topic}
                            onClick={() => askFollowUp(f, lastMessage?.locale ?? siteLocale)}
                            className={chipClass}
                          >
                            {f.label}
                          </button>
                        ))}
                  </div>
                )}
              </div>

              {/* Composer */}
              <form onSubmit={handleSubmit} className="border-t border-border p-3">
                <div className="flex items-center gap-2 rounded-md border border-border-strong bg-bg pl-4 pr-1.5 focus-within:border-accent focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent/70">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("assistant.placeholder")}
                    aria-label={t("assistant.placeholder")}
                    maxLength={300}
                    autoComplete="off"
                    enterKeyHint="send"
                    // 16px on touch screens: iOS Safari zooms the whole page on focus for anything smaller.
                    className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-text placeholder:text-text-faint focus:outline-none sm:text-[13.5px] [@media(pointer:coarse)]:!text-[16px]"
                  />
                  <button
                    type="submit"
                    aria-label={t("assistant.send")}
                    disabled={!input.trim()}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-opacity disabled:opacity-40 sm:h-9 sm:w-9 [@media(pointer:coarse)]:!h-11 [@media(pointer:coarse)]:!w-11"
                  >
                    <Send className="h-[15px] w-[15px]" aria-hidden />
                  </button>
                </div>
                <p className="mt-2 text-center font-mono text-[10px] leading-relaxed text-text-faint">
                  {t("assistant.disclaimer")}
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
