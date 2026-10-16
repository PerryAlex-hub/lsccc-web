import { assets } from "./assets";
import { destinations } from "./navigation";

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

export { agencies } from "./content/agencies";

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
