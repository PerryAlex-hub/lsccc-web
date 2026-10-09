export const mandates = [
  {
    title: "Emergency communication",
    description:
      "Receive calls and share incident information with relevant response agencies.",
  },
  {
    title: "Interagency coordination",
    description:
      "Support communication across emergency management, fire, traffic, ambulance and security services.",
  },
  {
    title: "Public awareness",
    description:
      "Help residents understand how to report emergencies and keep emergency lines available.",
  },
] as const;

export const operatingStages = [
  "Receive the emergency call",
  "Establish the incident and location",
  "Share details with response agencies",
  "Support coordinated communication",
] as const;

export const responsePartners = [
  { name: "LASEMA", role: "Emergency management" },
  { name: "FIRE & RESCUE", role: "Fire and rescue services" },
  { name: "LASAMBUS", role: "Ambulance services" },
  { name: "LASTMA", role: "Traffic management" },
  { name: "RRS", role: "Rapid response squad" },
] as const;

export const milestones = [
  { year: "2010", description: "Establishment of the centre" },
  {
    year: "2025",
    description: "Technology and infrastructure upgrade programme",
  },
  {
    year: "2026",
    description: "LERMS stakeholder engagement and technical training",
  },
] as const;
