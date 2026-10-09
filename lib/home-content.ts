import { assets } from "./assets";
import { destinations } from "./navigation";

export const newsStories = [
  {
    asset: assets.frscEngagement,
    nodeId: "34:744",
    imageNodeId: "34:745",
    date: "18 FEBRUARY 2026",
    dateTime: "2026-02-18",
    title: "LSCCC and FRSC deepen road safety collaboration",
    titleLines: ["LSCCC and FRSC deepen", "road safety collaboration"],
    description:
      "The agencies discussed information exchange, traffic incident monitoring and coordinated response.",
    source: "Radio Nigeria Lagos",
    href: `${destinations.news}/lsccc-frsc-road-safety-collaboration`,
  },
  {
    asset: assets.responderTraining,
    nodeId: "34:751",
    imageNodeId: "34:752",
    date: "18 FEBRUARY 2025",
    dateTime: "2025-02-18",
    title: "First responders trained in emergency management",
    titleLines: ["First responders trained", "in emergency management"],
    description:
      "The centre and its partners organised a three-day programme covering emergency response practices.",
    source: "Channels Television",
    href: `${destinations.news}/first-responder-emergency-management-training`,
  },
  {
    asset: assets.operations,
    nodeId: "34:758",
    imageNodeId: "34:759",
    date: "18 JANUARY 2026",
    dateTime: "2026-01-18",
    title: "LSSTF leadership visits the Command & Control Centre",
    titleLines: ["LSSTF leadership visits", "the Command & Control Centre"],
    description:
      "The visit reviewed the centre’s operations and the role of its emergency call agents.",
    source: "The MediaGood",
    href: `${destinations.news}/lsstf-leadership-visits-command-control-centre`,
  },
] as const;

export const informationLinks = [
  {
    title: "Mandate & operations",
    description: "How the centre coordinates emergency communication.",
    href: destinations.mandate,
  },
  {
    title: "Response partners",
    description: "The agencies working within the response network.",
    href: destinations.partners,
  },
  {
    title: "Emergency reporting",
    description: "What to tell a call agent when you report an incident.",
    href: destinations.beforeYouCall,
  },
  {
    title: "News & media",
    description: "Updates, training and institutional engagements.",
    href: destinations.news,
  },
  {
    title: "Contact & enquiries",
    description: "General, media and partnership enquiries.",
    href: destinations.contact,
  },
] as const;

export const agencies = [
  {
    abbreviation: "LASEMA",
    name: "Lagos State Emergency Management Agency",
    description: "Emergency management and disaster response.",
  },
  {
    abbreviation: "FIRE & RESCUE",
    name: "Lagos State Fire and Rescue Service",
    description: "Fire response and rescue services.",
  },
  {
    abbreviation: "LASAMBUS",
    name: "Lagos State Ambulance Service",
    description: "Emergency ambulance assistance.",
  },
  {
    abbreviation: "LASTMA",
    name: "Lagos State Traffic Management Authority",
    description: "Traffic management and incident coordination.",
  },
  {
    abbreviation: "RRS",
    name: "Rapid Response Squad",
    description: "Police rapid response and public safety.",
  },
  {
    abbreviation: "FRSC",
    name: "Federal Road Safety Corps",
    description: "Road safety and traffic incident collaboration.",
  },
] as const;

export const gallery = [
  {
    asset: assets.lermsEngagement,
    imageNodeId: "34:855",
    caption: "Stakeholder engagement on LERMS",
    date: "MAY 2026",
  },
  {
    asset: assets.responderTraining,
    imageNodeId: "34:859",
    caption: "Emergency management training",
    date: "FEBRUARY 2025",
  },
  {
    asset: assets.frscEngagement,
    imageNodeId: "34:863",
    caption: "Engagement with the FRSC Sector Command",
    date: "FEBRUARY 2026",
  },
] as const;

export const resources = [
  {
    id: "before-you-call",
    title: "Before you call",
    description: "Location, incident details and callback information.",
    href: destinations.beforeYouCall,
  },
  {
    id: "emergency-information",
    title: "Emergency services",
    description: "When to call and how emergency reporting works.",
    href: destinations.emergency,
  },
  {
    id: "general-enquiries",
    title: "General enquiries",
    description: "Information requests, media and partnership messages.",
    href: destinations.contact,
  },
  {
    id: "government-services",
    title: "Lagos State services",
    description: "Official government services and public information.",
    href: destinations.governmentServices,
  },
] as const;
