"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import HtmlT from "@/components/ui/HtmlT";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { siteConfig } from "@/lib/site";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Editorial About section — personal identity, systems-thinking philosophy,
 * and high-fidelity developer portrait card with architectural framing.
 */
export default function AboutSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const para =
    "text-[15px] leading-[1.75] text-text-dim sm:text-[15.5px] [&_strong]:font-medium [&_strong]:text-text";

  const pillars = [
    {
      icon: Cpu,
      title: "Systems-First",
      desc: "Schema, roles & states before pixels",
    },
    {
      icon: ShieldCheck,
      title: "Production-Ready",
      desc: "Real auth, payments & live data",
    },
  ];

  return (
    <section id="about" className="relative border-t border-border bg-surface py-20 md:py-28 lg:py-36">
      {/* Subtle architectural grid coordinates motif */}
      <div className="wrap relative">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[400px_1fr] lg:gap-16 xl:grid-cols-[440px_1fr] xl:gap-20">
          
          {/* Left Column: Bespoke Developer Portrait Card */}
          <Reveal delay={0.05} className="mx-auto w-full max-w-[420px] lg:mx-0 lg:sticky lg:top-28">
            <div className="group relative rounded-2xl border border-border-strong bg-bg p-3 shadow-[0_20px_50px_-20px_rgb(var(--shadow)/0.35)] transition-all duration-500 hover:border-accent/40 sm:p-4">
              
              {/* Technical corner coordinate crosshairs */}
              <span className="pointer-events-none absolute -left-1 -top-1 font-mono text-[11px] text-accent/50 select-none">+</span>
              <span className="pointer-events-none absolute -right-1 -top-1 font-mono text-[11px] text-accent/50 select-none">+</span>
              <span className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[11px] text-accent/50 select-none">+</span>
              <span className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[11px] text-accent/50 select-none">+</span>

              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface">
                <Image
                  src="/profil/zkrlinkendin.jfif"
                  alt="Zakaria Adli (ZKR) — Full-Stack Developer"
                  fill
                  priority={false}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 440px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Ambient vignette and identity gradient */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
                />

                {/* Live Availability Badge */}
                <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-border-strong/80 bg-bg/90 px-3 py-1 shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[10.5px] font-medium tracking-tight text-text">
                    Available for projects
                  </span>
                </div>

                {/* Location overlay badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-border-strong/70 bg-bg/85 px-2.5 py-1 backdrop-blur-md">
                  <MapPin className="h-3 w-3 text-accent" />
                  <span className="font-mono text-[10px] text-text-dim">
                    {siteConfig.location}
                  </span>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="mt-3 flex items-center justify-between px-1 pt-1 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text">ZAKARIA ADLI</span>
                  <span className="text-text-faint">/</span>
                  <span className="text-accent font-medium">ZKR</span>
                </div>
                <span className="text-text-faint uppercase tracking-wider text-[10px]">
                  Full-Stack Dev
                </span>
              </div>
            </div>

            {/* Quick credentials / focus pill beneath photo */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-center sm:text-left">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-lg border border-border/80 bg-bg/50 p-2.5 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-center gap-1.5 text-accent font-mono text-[10.5px] font-medium">
                    <pillar.icon className="h-3 w-3 shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-tight text-text-faint">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Editorial Narrative & Story */}
          <div className="space-y-8">
            <Reveal>
              <div className="eyebrow">{t("about.eyebrow")}</div>
              <HtmlT
                k="about.quote"
                as="h2"
                className="mt-2 font-serif text-[clamp(26px,3vw,36px)] leading-[1.25] tracking-[-0.015em] text-text [&_em]:font-serif [&_em]:italic [&_em]:text-accent"
              />
            </Reveal>

            <Reveal delay={0.12} className="space-y-5 border-l-2 border-accent/20 pl-5 sm:pl-6">
              <HtmlT k="about.p1" as="p" className={para} />
              <HtmlT k="about.p2" as="p" className={para} />
              <HtmlT k="about.p3" as="p" className={para} />
            </Reveal>

            {/* Next Step CTA */}
            <Reveal delay={0.2} className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic
                as="a"
                href="#work"
                className="btn btn-primary"
                data-cursor="VIEW"
              >
                {t("hero.ctaView")} <ArrowUpRight className="h-[15px] w-[15px]" />
              </Magnetic>
              <Magnetic
                as="a"
                href="#contact"
                className="btn btn-ghost"
                data-cursor="OPEN"
              >
                {t("hero.ctaStart")}
              </Magnetic>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
