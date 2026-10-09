import { assets } from "../assets";
import { destinations } from "../navigation";

export const newsCategories = [
  "All updates",
  "Partnerships",
  "Infrastructure",
  "Training",
] as const;
export type NewsCategory = (typeof newsCategories)[number];

export const infrastructureArticle = {
  slug: "lagos-strengthens-emergency-coordination-hub",
  title: "Lagos strengthens its emergency coordination hub.",
  displayTitle: "Lagos strengthens its\nemergency coordination hub.",
  description:
    "Technology and infrastructure upgrades support coordinated emergency response across Lagos State.",
  category: "Infrastructure",
  date: "June 2025",
  dateTime: "2025-06-04",
  source: "Lagos State Government",
  sourceHref:
    "https://lagosstate.gov.ng/news/all/view/684298e65e4c9d6ceca7d516",
  paragraphs: [
    "Lagos State announced technology and infrastructure upgrades at the Command & Control Centre to strengthen emergency coordination.",
    "The centre serves as a communication hub linking emergency management, fire and rescue, traffic management, ambulance services and rapid response teams.",
    "The announced work focuses on the systems and infrastructure supporting this coordination. The original government release provides further details about the upgrades.",
  ],
} as const;

export const centreUpdates = [
  {
    id: "frsc-partnership",
    category: "Partnerships",
    date: "18 February 2026",
    dateTime: "2026-02-18",
    title: "LSCCC and FRSC deepen strategic collaboration",
    description:
      "Both institutions reaffirmed their commitment to road safety, shared information and coordinated emergency response.",
    source: "Radio Nigeria Lagos",
    href: "https://radionigerialagos.gov.ng/lsccc-frsc-deepen-strategic-collaboration-to-strengthen-road-safety-emergency-coordination/",
    asset: assets.frscEngagement,
    imageNodeId: "35:740",
  },
  {
    id: "first-responder-training",
    category: "Training",
    date: "18 February 2025",
    dateTime: "2025-02-18",
    title: "Building the capacity of first responders",
    description:
      "Emergency management training brought first responders together to strengthen their preparedness.",
    source: "Channels Television",
    href: "https://www.channelstv.com/2025/02/18/lagos-centre-trains-first-responders-on-emergency-management/",
    asset: assets.responderTraining,
    imageNodeId: "35:741",
  },
] as const;

export const articleHref = `${destinations.news}/${infrastructureArticle.slug}`;
