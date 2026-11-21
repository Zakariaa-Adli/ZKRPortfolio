"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import HtmlT from "@/components/ui/HtmlT";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { siteConfig } from "@/lib/site";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Editorial About section — personal identity, systems-thinking philosophy,
 * and perfectly circular, responsive developer portrait.
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
      <div className="wrap relative">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-16 xl:grid-cols-[380px_1fr] xl:gap-20">
          
          {/* Left Column: Perfectly Circular Developer Profile Photo & Identity */}
          <Reveal delay={0.05} className="mx-auto flex w-full max-w-[380px] flex-col items-center lg:items-start lg:sticky lg:top-28">
            <div className="group relative flex flex-col items-center lg:items-start">
              
              {/* Circular Portrait Frame (50% border radius, perfectly circular) */}
              <div className="relative aspect-square w-[200px] overflow-hidden rounded-full border-2 border-border-strong bg-bg p-1.5 shadow-[0_20px_45px_-20px_rgb(var(--shadow)/0.4)] transition-all duration-500 hover:border-accent/50 sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[310px]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
                  <Image
                    src="/profil/zkrlinkendin.jfif"
                    alt="Zakaria Adli (ZKR) — Full-Stack Developer"
                    fill
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 260px, (max-width: 1280px) 280px, 310px"
                    className="rounded-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    priority={false}
                    unoptimized
                  />
                </div>
              </div>

              {/* Live Availability Badge */}
              <div className="mt-5 flex items-center gap-2 rounded-full border border-border-strong/90 bg-bg px-3.5 py-1.5 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] font-medium tracking-tight text-text">
                  Available for projects
                </span>
              </div>

              {/* Meta identity & location */}
              <div className="mt-3 flex items-center gap-2.5 font-mono text-[11px]">
                <span className="font-semibold text-text">ZAKARIA ADLI</span>
                <span className="text-text-faint">•</span>
                <span className="text-accent font-medium">ZKR</span>
                <span className="text-text-faint">•</span>
                <span className="flex items-center gap-1 text-text-dim">
                  <MapPin className="h-3 w-3 text-accent" />
                  {siteConfig.location}
                </span>
              </div>
            </div>

            {/* Quick credentials / focus pillars beneath photo */}
            <div className="mt-6 grid w-full grid-cols-2 gap-2.5 text-center sm:text-left">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-lg border border-border/80 bg-bg/60 p-2.5 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-center justify-center gap-1.5 text-accent font-mono text-[10.5px] font-medium sm:justify-start">
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
