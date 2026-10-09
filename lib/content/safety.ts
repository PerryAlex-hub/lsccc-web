import { destinations } from "../navigation";

export const safetyTopics = [
  {
    id: "fire",
    title: "Fire safety",
    description:
      "Household precautions, workplace awareness and fire reporting.",
    accent: "bg-red",
    href: destinations.governmentServices,
  },
  {
    id: "flood",
    title: "Flood preparedness",
    description:
      "Seasonal awareness, emergency planning and reporting flooding.",
    accent: "bg-blue",
    href: destinations.governmentServices,
  },
  {
    id: "road",
    title: "Road safety",
    description:
      "Reporting serious incidents and understanding response agencies.",
    accent: "bg-green",
    href: destinations.governmentServices,
  },
  {
    id: "community",
    title: "Home & community",
    description: "Emergency contacts, household plans and shared awareness.",
    accent: "bg-gold",
    href: destinations.governmentServices,
  },
  {
    id: "reporting",
    title: "Emergency reporting",
    description: "How to communicate incident details when you call for help.",
    accent: "bg-navy",
    href: destinations.beforeYouCall,
  },
  {
    id: "information",
    title: "Public information",
    description: "Find agency announcements and official government resources.",
    accent: "bg-blue",
    href: destinations.governmentServices,
  },
] as const;

export const callChecklist = [
  "Location and nearby landmarks",
  "A clear description of the incident",
  "Your name and callback number",
] as const;
