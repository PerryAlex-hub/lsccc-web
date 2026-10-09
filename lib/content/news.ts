import type { StaticImageData } from "next/image";
import { assets } from "../assets";

export const newsCategories = [
  "All news",
  "Coordination",
  "Partnerships",
  "Infrastructure",
  "Training",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsArticle = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<NewsCategory, "All news">;
  date: string;
  dateTime: string;
  asset: { image: StaticImageData; alt: string };
  caption: string;
  source: string;
  paragraphs: readonly string[];
};

// Initial editorial summaries for UI review. Publishing is handled separately.
export const newsArticles: readonly NewsArticle[] = [
  {
    slug: "lerms-stakeholder-engagement",
    title:
      "LERMS stakeholder engagement strengthens Lagos emergency response coordination",
    description:
      "Response agencies and technical partners come together to strengthen incident reporting, dispatch coordination and shared operational information.",
    category: "Coordination",
    date: "20 May 2026",
    dateTime: "2026-05-20",
    asset: assets.lermsEngagement,
    caption: "Participants at the LERMS stakeholder engagement in Ikeja.",
    source: "Punch",
    paragraphs: [
      "Emergency response agencies and technical partners met in Ikeja to discuss how the Lagos Emergency Response Management System (LERMS) can support coordinated emergency response.",
      "The engagement focused on incident reporting, dispatch coordination and the exchange of operational information between participating agencies. Shared information helps the response network understand an incident and identify the agencies required.",
      "The Command & Control Centre brings emergency communication and interagency coordination together. Its call agents receive incident information, while specialist response agencies provide assistance on the ground.",
      "The stakeholder engagement forms part of the centre’s work with response partners to strengthen the systems supporting emergency communication across Lagos State.",
    ],
  },
  {
    slug: "lsccc-frsc-road-safety-collaboration",
    title: "LSCCC and FRSC deepen road safety collaboration",
    description:
      "The centre and the Federal Road Safety Corps discuss information exchange, traffic incident monitoring and coordinated response.",
    category: "Partnerships",
    date: "18 February 2026",
    dateTime: "2026-02-18",
    asset: assets.frscEngagement,
    caption:
      "LSCCC and FRSC representatives at their institutional engagement.",
    source: "Radio Nigeria Lagos",
    paragraphs: [
      "The Lagos State Command & Control Centre and the Federal Road Safety Corps reaffirmed their commitment to working together on road safety and emergency coordination.",
      "Their discussions covered information exchange, traffic incident monitoring and coordinated response. Cooperation between the centre and road safety officers supports the communication required when incidents occur on Lagos roads.",
      "The engagement reflects the centre’s role in connecting emergency information with the agencies responsible for providing assistance. The FRSC is part of the wider network of response partners working with the centre.",
    ],
  },
  {
    slug: "lsstf-leadership-visits-command-control-centre",
    title: "LSSTF leadership visits the Command & Control Centre",
    description:
      "An institutional visit reviews the centre’s operations and the work of its emergency call agents.",
    category: "Partnerships",
    date: "18 January 2026",
    dateTime: "2026-01-18",
    asset: assets.operations,
    caption: "Emergency call agents working at the Command & Control Centre.",
    source: "The MediaGood",
    paragraphs: [
      "Leadership of the Lagos State Security Trust Fund visited the Command & Control Centre to review its operations and the role of its emergency call agents.",
      "The centre receives emergency information through the state’s published helplines and coordinates communication with response agencies. Its work depends on both trained personnel and the systems supporting incident handling.",
      "The visit provided an opportunity to learn about the centre’s contribution to public safety and its place within Lagos State’s emergency response network.",
    ],
  },
  {
    slug: "lagos-strengthens-emergency-coordination-hub",
    title: "Lagos strengthens its emergency coordination hub",
    description:
      "Technology and infrastructure upgrades support coordinated emergency response across Lagos State.",
    category: "Infrastructure",
    date: "4 June 2025",
    dateTime: "2025-06-04",
    asset: assets.operations,
    caption:
      "LSCCC call agents at work. Photograph illustrates centre operations.",
    source: "Lagos State Government",
    paragraphs: [
      "Lagos State announced technology and infrastructure upgrades at the Command & Control Centre to strengthen emergency coordination.",
      "The centre serves as a communication hub linking emergency management, fire and rescue, traffic management, ambulance services and rapid response teams.",
      "The announced work focuses on the systems and infrastructure supporting this coordination. These systems help the centre receive incident information and communicate with the agencies involved in responding.",
    ],
  },
  {
    slug: "first-responder-emergency-management-training",
    title: "First responders trained in emergency management",
    description:
      "A three-day programme brings first responders together to strengthen their preparedness and emergency response practices.",
    category: "Training",
    date: "18 February 2025",
    dateTime: "2025-02-18",
    asset: assets.responderTraining,
    caption: "First responders attending emergency management training.",
    source: "Channels Television",
    paragraphs: [
      "The Command & Control Centre and its partners organised a three-day emergency management programme for first responders.",
      "The programme brought responders together to strengthen preparedness and share emergency response practices. Training supports the capacity of personnel who work across the emergency response network.",
      "The centre’s work includes communication, interagency coordination and institutional engagement. Training with response partners supports these responsibilities and the people delivering assistance on the ground.",
    ],
  },
];
