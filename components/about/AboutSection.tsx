"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import HtmlT from "@/components/ui/HtmlT";
import { useTranslation } from "@/lib/i18n/LanguageContext";

/** Editorial statement + portrait + short bio — a calm, recognizable break between Work and Experience. */
export default function AboutSection() {
  const { t } = useTranslation();
  const para =
    "max-w-[560px] text-[15.5px] text-text-dim [&_strong]:font-medium [&_strong]:text-text";

  return (
    <section id="about" className="relative border-t border-border bg-surface py-24 md:py-[150px]">
      <div className="wrap relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-20">
          <Reveal className="lg:pt-2">
            <div className="eyebrow">{t("about.eyebrow")}</div>
            <HtmlT
              k="about.quote"
              as="p"
              className="max-w-[520px] font-serif text-[clamp(26px,2.8vw,34px)] leading-[1.3] tracking-[-0.01em] [&_em]:font-serif [&_em]:italic [&_em]:text-accent"
            />

            <figure className="relative mt-10 w-full max-w-[420px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-[28px] border border-accent/25 bg-accent/5"
              />
              <div className="relative overflow-hidden rounded-[28px] border border-border-strong bg-bg/70 p-2 shadow-[0_24px_48px_-28px_rgb(var(--shadow)/0.45)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] sm:aspect-square lg:aspect-[4/5]">
                  <Image
                    src="/profil/zkrlinkendin.jfif"
                    alt="Portrait of Zakaria Adli (ZKR), full-stack developer based in Casablanca, Morocco."
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 420px, 34vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                </div>
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.08em] text-text-faint">
                <span>Zakaria Adli / ZKR</span>
                <span>Casablanca, Morocco</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center space-y-5 lg:pt-16">
            <HtmlT k="about.p1" as="p" className={para} />
            <HtmlT k="about.p3" as="p" className={para} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
