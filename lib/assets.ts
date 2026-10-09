import type { StaticImageData } from "next/image";
import lagosCrest from "@/public/images/lsccc/lagos-state-crest.jpg";
import lscccEmblem from "@/public/images/lsccc/lsccc-emblem.jpg";
import operations from "@/public/images/lsccc/operations.jpg";
import lermsEngagement from "@/public/images/lsccc/lerms-engagement.jpg";
import frscEngagement from "@/public/images/lsccc/frsc-engagement.jpg";
import responderTraining from "@/public/images/lsccc/responder-training.jpg";

type DesignAsset = {
  image: StaticImageData;
  alt: string;
  figmaNodeId: string;
};

// Original Figma image fills, rather than screenshots of the page designs.
export const assets = {
  lagosCrest: {
    image: lagosCrest,
    alt: "Lagos State crest",
    figmaNodeId: "17:78",
  },
  lscccEmblem: {
    image: lscccEmblem,
    alt: "Lagos State Command & Control Centre emblem",
    figmaNodeId: "17:62",
  },
  operations: {
    image: operations,
    alt: "Emergency call agents working at the Lagos State Command & Control Centre",
    figmaNodeId: "43:761",
  },
  lermsEngagement: {
    image: lermsEngagement,
    alt: "Participants at the LERMS stakeholder engagement",
    figmaNodeId: "34:719",
  },
  frscEngagement: {
    image: frscEngagement,
    alt: "LSCCC and FRSC representatives at their institutional engagement",
    figmaNodeId: "34:745",
  },
  responderTraining: {
    image: responderTraining,
    alt: "First responders attending emergency management training",
    figmaNodeId: "34:752",
  },
} satisfies Record<string, DesignAsset>;
