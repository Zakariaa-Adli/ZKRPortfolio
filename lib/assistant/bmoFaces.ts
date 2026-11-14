/**
 * BMO face expression catalog and mood mapping for ZKR Portfolio AI Agent.
 *
 * Mapped from visual inspection of all 30 images in /public/bmo.
 * All face images share the exact mint-green background (#C0F9DE).
 */

import type { Topic } from "@/lib/assistant/engine";

export type BmoMood =
  | "happy"
  | "excited"
  | "sparkly"
  | "shining"
  | "love"
  | "blushing"
  | "playful"
  | "curious"
  | "focused"
  | "skeptical"
  | "shocked"
  | "sad"
  | "crying"
  | "peaceful"
  | "dizzy"
  | "pixel"
  | "emoticon"
  | "knockout";

export type BmoFace = {
  id: string;
  filename: string;
  src: string;
  mood: BmoMood;
  label: string;
  description: string;
};

export const BMO_FACES: readonly BmoFace[] = [
  {
    id: "welcome-joy",
    filename: "image-www.figma.com.png",
    src: "/bmo/image-www.figma.com.png",
    mood: "happy",
    label: "Joyful Welcome",
    description: "Classic BMO open-mouth :D joyful smile with green tongue",
  },
  {
    id: "gentle-smile",
    filename: "c747be51-9e7e-48a6-9472-7b864e43e43b.png",
    src: "/bmo/c747be51-9e7e-48a6-9472-7b864e43e43b.png",
    mood: "happy",
    label: "Gentle Smile",
    description: "Warm curved mouth smile with friendly dot eyes",
  },
  {
    id: "star-eyes",
    filename: "image-www.figma.com (17).png",
    src: "/bmo/image-www.figma.com%20(17).png",
    mood: "sparkly",
    label: "Star Eyes",
    description: "Golden five-pointed star eyes with wide excited smile",
  },
  {
    id: "sparkly-anime",
    filename: "image-www.figma.com (10).png",
    src: "/bmo/image-www.figma.com%20(10).png",
    mood: "sparkly",
    label: "Kawaii Sparkle",
    description: "Large sparkling anime eyes with pink blush cheeks",
  },
  {
    id: "sparkle-diamonds",
    filename: "image-www.figma.com (20).png",
    src: "/bmo/image-www.figma.com%20(20).png",
    mood: "shining",
    label: "Diamond Sparkle",
    description: "Four-point golden sparkle diamond eyes with open mouth",
  },
  {
    id: "heart-eyes",
    filename: "image-www.figma.com (18).png",
    src: "/bmo/image-www.figma.com%20(18).png",
    mood: "love",
    label: "Heart Eyes",
    description: "Pixelated red heart eyes in love with open mouth",
  },
  {
    id: "blushing-cat",
    filename: "image-www.figma.com (3).png",
    src: "/bmo/image-www.figma.com%20(3).png",
    mood: "blushing",
    label: "Blushing Cat",
    description: "Cute :3 mouth with green blush cheek spots",
  },
  {
    id: "optimistic-smile",
    filename: "image-www.figma.com (15).png",
    src: "/bmo/image-www.figma.com%20(15).png",
    mood: "excited",
    label: "Optimistic",
    description: "High arched eyebrows with confident open smile",
  },
  {
    id: "empathetic-smile",
    filename: "image-www.figma.com (12).png",
    src: "/bmo/image-www.figma.com%20(12).png",
    mood: "curious",
    label: "Empathetic",
    description: "Soft curved brows with gentle understanding smile",
  },
  {
    id: "focused-thinking",
    filename: "image-www.figma.com (7).png",
    src: "/bmo/image-www.figma.com%20(7).png",
    mood: "focused",
    label: "Focused",
    description: "Furrowed brow with serious focused concentration",
  },
  {
    id: "playful-tongue",
    filename: "image-www.figma.com (11).png",
    src: "/bmo/image-www.figma.com%20(11).png",
    mood: "playful",
    label: "Cheeky Tongue",
    description: "Cheeky tongue poked out :p with happy eyes",
  },
  {
    id: "anime-kiss",
    filename: "image-www.figma.com (16).png",
    src: "/bmo/image-www.figma.com%20(16).png",
    mood: "happy",
    label: "Anime Cheerful",
    description: "Playful anime face with chevron eyes and number 3 mouth",
  },
  {
    id: "skeptical-frown",
    filename: "image-www.figma.com (6).png",
    src: "/bmo/image-www.figma.com%20(6).png",
    mood: "skeptical",
    label: "Skeptical",
    description: "Squinting eyelids with downturned mouth",
  },
  {
    id: "side-eye",
    filename: "image-www.figma.com (13).png",
    src: "/bmo/image-www.figma.com%20(13).png",
    mood: "skeptical",
    label: "Side Eye",
    description: "Skeptical side-glance with crooked sideways mouth",
  },
  {
    id: "pixel-attentive",
    filename: "image-www.figma.com (28).png",
    src: "/bmo/image-www.figma.com%20(28).png",
    mood: "pixel",
    label: "Attentive Listener",
    description: "Pixel block eyes attentively listening",
  },
  {
    id: "pixel-retro-smile",
    filename: "image-www.figma.com (24).png",
    src: "/bmo/image-www.figma.com%20(24).png",
    mood: "pixel",
    label: "Retro Pixel Smile",
    description: "Chunky 8-bit arcade pixel smile",
  },
  {
    id: "peaceful-resting",
    filename: "image-www.figma.com (2).png",
    src: "/bmo/image-www.figma.com%20(2).png",
    mood: "peaceful",
    label: "Peaceful",
    description: "Serene closed curved eyes u_u with gentle smile",
  },
  {
    id: "stress-sweat",
    filename: "image-www.figma.com (19).png",
    src: "/bmo/image-www.figma.com%20(19).png",
    mood: "shocked",
    label: "Flustered",
    description: "Purple anime vertical stress lines with wide round eyes",
  },
  {
    id: "dizzy-spirals",
    filename: "image-www.figma.com (21).png",
    src: "/bmo/image-www.figma.com%20(21).png",
    mood: "dizzy",
    label: "Dizzy Spirals",
    description: "Hypnotic spiral swirl eyes @_@ with dazed wavy mouth",
  },
  {
    id: "knockout-error",
    filename: "image-www.figma.com (23).png",
    src: "/bmo/image-www.figma.com%20(23).png",
    mood: "knockout",
    label: "Knocked Out",
    description: "X _ X cross eyes with flat mouth",
  },
  {
    id: "fierce-determined",
    filename: "image-www.figma.com (5).png",
    src: "/bmo/image-www.figma.com%20(5).png",
    mood: "focused",
    label: "Determined",
    description: "Fierce angled eyebrows with determined shouting mouth",
  },
  {
    id: "grumpy-frown",
    filename: "image-www.figma.com (8).png",
    src: "/bmo/image-www.figma.com%20(8).png",
    mood: "skeptical",
    label: "Grumpy",
    description: "Angular sharp eyebrows with grumpy frown",
  },
  {
    id: "gentle-frown",
    filename: "image-www.figma.com (1).png",
    src: "/bmo/image-www.figma.com%20(1).png",
    mood: "sad",
    label: "Downcast",
    description: "Subtle downturned sad mouth with simple dot eyes",
  },
  {
    id: "tearful-puppy",
    filename: "image-www.figma.com (4).png",
    src: "/bmo/image-www.figma.com%20(4).png",
    mood: "crying",
    label: "Tearful",
    description: "Big sorrowful puppy-dog eyes with welling tears",
  },
  {
    id: "waterfall-tears",
    filename: "image-www.figma.com (9).png",
    src: "/bmo/image-www.figma.com%20(9).png",
    mood: "crying",
    label: "Waterfall Tears",
    description: "Dramatic streaming triangle waterfall tears",
  },
  {
    id: "shocked-tremble",
    filename: "image-www.figma.com (14).png",
    src: "/bmo/image-www.figma.com%20(14).png",
    mood: "shocked",
    label: "Trembling Shock",
    description: "Wavy trembling eyebrows and mouth in startled shock",
  },
  {
    id: "emoticon-laugh",
    filename: "image-www.figma.com (26).png",
    src: "/bmo/image-www.figma.com%20(26).png",
    mood: "emoticon",
    label: "Emoticon Grin",
    description: "Bold typographic :D emoticon smile",
  },
  {
    id: "emoticon-gasp",
    filename: "image-www.figma.com (25).png",
    src: "/bmo/image-www.figma.com%20(25).png",
    mood: "emoticon",
    label: "Emoticon Gasp",
    description: "Bold typographic D: emoticon dismay",
  },
  {
    id: "pixel-sleeping",
    filename: "image-www.figma.com (27).png",
    src: "/bmo/image-www.figma.com%20(27).png",
    mood: "peaceful",
    label: "Pixel Sleeping",
    description: "Minimal flat pixel sleeping bars - _ -",
  },
  {
    id: "dizzy-spirals-alt",
    filename: "image-www.figma.com (22).png",
    src: "/bmo/image-www.figma.com%20(22).png",
    mood: "dizzy",
    label: "Dizzy Spirals (Alt)",
    description: "Hypnotic dizzy swirl eyes variation",
  },
] as const;

function requireFace(index: number): BmoFace {
  const face = BMO_FACES[index];
  if (!face) return BMO_FACES[0]!;
  return face;
}

export const DEFAULT_WELCOME_FACE: BmoFace = requireFace(0); // image-www.figma.com.png (:D)
export const LISTENING_FACE: BmoFace = requireFace(14); // image-www.figma.com (28).png (pixel attentive)
export const ERROR_FACE: BmoFace = requireFace(19); // image-www.figma.com (23).png (X _ X)
export const FALLBACK_FACE: BmoFace = requireFace(12); // image-www.figma.com (6).png (skeptical/confused)

/**
 * Maps assistant response topics to appropriate BMO face expressions.
 */
export function getFaceForTopic(topic: Topic | "fallback"): BmoFace {
  switch (topic) {
    case "skills":
      // Star eyes glowing with pride
      return requireFace(2); // (17).png: Star eyes
    case "projects":
      // Optimistic, excited about shipped builds
      return requireFace(7); // (15).png: Optimistic smile
    case "experience":
      // Sparkling diamond eyes for seasoned career
      return requireFace(4); // (20).png: Diamond sparkle
    case "contact":
    case "instagram":
      // Heart eyes for warm connections
      return requireFace(5); // (18).png: Heart eyes
    case "github":
      // 8-bit retro pixel smile for code & engineering
      return requireFace(15); // (24).png: Pixel retro smile
    case "about":
    case "currentlyWorkingOn":
      // Blushing cat face for personal background
      return requireFace(6); // (3).png: Blushing cat :3
    case "education":
      // Empathetic, honest self-taught background
      return requireFace(8); // (12).png: Empathetic gentle smile
    case "thanks":
      // Anime cute happy face > 3 <
      return requireFace(11); // (16).png: Anime cheerful
    case "greeting":
      // Iconic joyful welcome
      return DEFAULT_WELCOME_FACE;
    case "fallback":
    default:
      // Squinting skeptical/curious face for unmatched question
      return FALLBACK_FACE;
  }
}

/**
 * Returns the next face in the collection when cycling manually.
 */
export function getNextFace(currentFilename: string): BmoFace {
  const currentIndex = BMO_FACES.findIndex((f) => f.filename === currentFilename);
  if (currentIndex === -1 || currentIndex >= BMO_FACES.length - 1) {
    return DEFAULT_WELCOME_FACE;
  }
  return requireFace(currentIndex + 1);
}

/**
 * Returns face matching a specific filename, falling back to default welcome face.
 */
export function getFaceByFilename(filename: string): BmoFace {
  return BMO_FACES.find((f) => f.filename === filename) ?? DEFAULT_WELCOME_FACE;
}
