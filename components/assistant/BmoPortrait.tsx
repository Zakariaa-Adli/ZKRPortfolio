"use client";

import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEFAULT_WELCOME_FACE, type BmoFace } from "@/lib/assistant/bmoFaces";

type BmoPortraitProps = {
  face?: BmoFace;
  size?: "sm" | "md" | "lg" | "trigger" | "character" | "header" | "custom";
  interactive?: boolean;
  onCycleFace?: () => void;
  className?: string;
  ariaLabel?: string;
};

const SIZE_CLASSES = {
  sm: "w-[28px] h-[37px] sm:w-[32px] sm:h-[42.2px]",
  md: "w-[40px] h-[52.8px] sm:w-[46px] sm:h-[60.7px]",
  header: "w-[48px] h-[63.3px] sm:w-[58px] sm:h-[76.5px]",
  trigger: "w-[54px] h-[71.2px] sm:w-[68px] sm:h-[89.7px] lg:w-[82px] lg:h-[108.2px]",
  character: "w-[54px] h-[71.2px] sm:w-[68px] sm:h-[89.7px] lg:w-[82px] lg:h-[108.2px]",
  lg: "w-[72px] h-[95px] sm:w-[84px] sm:h-[110.8px]",
  custom: "",
} as const;

export default function BmoPortrait({
  face,
  size = "md",
  interactive = false,
  onCycleFace,
  className,
  ariaLabel = "BMO companion — click to change expression",
}: BmoPortraitProps) {
  const reduceMotion = useReducedMotion();
  const currentFace = face ?? DEFAULT_WELCOME_FACE;

  const content = (
    <div
      className={cn(
        "relative select-none aspect-[818/1080] shrink-0",
        SIZE_CLASSES[size],
        className
      )}
    >
      {/* Screen container: positioned exactly behind the BMO bezel window */}
      <div
        className="absolute left-[8.31%] top-[5.0%] w-[83.37%] h-[42.5%] overflow-hidden bg-[#C0F9DE] rounded-[1px]"
        data-testid="bmo-screen"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentFace.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.22,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src={currentFace.src}
              alt={currentFace.label}
              fill
              sizes="(max-width: 640px) 140px, 220px"
              priority
              className="object-cover select-none pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BMO frame bezel overlay: lossless transparent PNG with cut-out screen */}
      <Image
        src="/logo/bmo-frame.png"
        alt="BMO"
        fill
        priority
        sizes="(max-width: 640px) 140px, 220px"
        className="pointer-events-none select-none z-10"
      />
    </div>
  );

  if (interactive && onCycleFace) {
    return (
      <motion.button
        type="button"
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={(e) => {
          e.stopPropagation();
          onCycleFace();
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {content}
      </motion.button>
    );
  }

  return content;
}
