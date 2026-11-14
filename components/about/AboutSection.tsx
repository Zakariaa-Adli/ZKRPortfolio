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

            <figure className="mt-10 flex w-full max-w-[420px] flex-col items-center lg:items-start">
              <div className="relative aspect-square w-[220px] overflow-hidden rounded-full border border-border-strong bg-bg/70 shadow-[0_18px_36px_-24px_rgb(var(--shadow)/0.4)] sm:w-[260px] lg:w-[280px]">
                <Image
                  src="/profil/zkrlinkendin.jfif"
                  alt="Portrait of Zakaria Adli (ZKR), full-stack developer based in Casablanca, Morocco."
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 280px"
                  className="object-cover object-center"
                  unoptimized
                />
              </div>
              <figcaption className="mt-4 flex w-full max-w-[280px] items-center justify-between gap-4 text-center font-mono text-[10px] uppercase tracking-[.08em] text-text-faint lg:text-left">
                <span>Zakaria Adli / ZKR</span>
                <span>Casablanca</span>
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
