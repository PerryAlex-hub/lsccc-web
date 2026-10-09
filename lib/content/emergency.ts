export const incidentTypes = [
  {
    title: "Fire & rescue",
    description: "Fires, people trapped or incidents requiring rescue.",
    accent: "bg-red",
  },
  {
    title: "Medical emergencies",
    description: "Urgent situations requiring ambulance assistance.",
    accent: "bg-blue",
  },
  {
    title: "Public safety incidents",
    description: "Serious road incidents, disasters or immediate threats.",
    accent: "bg-green",
  },
] as const;

export const reportingSteps = [
  {
    title: "Call 112 or 767",
    description: "Stay calm and wait for the call agent.",
  },
  {
    title: "Give your location",
    description: "Share the address and nearby landmarks.",
  },
  {
    title: "Describe the incident",
    description: "Explain what happened and who needs help.",
  },
  {
    title: "Follow instructions",
    description: "Keep your phone available for follow-up.",
  },
] as const;

export const emergencyQuestions = [
  {
    question: "What information should I give?",
    answer:
      "Share your location, a nearby landmark, the type of incident and a phone number where you can be reached.",
  },
  {
    question: "Can I use the contact form for an emergency?",
    answer:
      "Call 112 or 767 for immediate assistance. The website enquiry form is for general messages.",
  },
  {
    question: "What if my enquiry is not urgent?",
    answer:
      "Use the Contact & Enquiries page or the Lagos State Citizens Gate for general government feedback.",
  },
] as const;

export const callingDetails = [
  {
    title: "The exact location",
    description:
      "Give the address, street name and area. If you do not know the address, describe nearby landmarks.",
    prompt: "Include: street • community • landmark",
  },
  {
    title: "What happened",
    description:
      "Describe the incident clearly and say what assistance appears to be needed.",
    prompt: "Include: type of incident • what you can observe",
  },
  {
    title: "People who need help",
    description:
      "Explain whether people are involved and share the information the call agent asks for.",
    prompt: "Include: number of people involved, if known",
  },
  {
    title: "How to reach you",
    description:
      "Provide a callback number and stay available for any follow-up questions.",
    prompt: "Include: your name • callback number",
  },
] as const;
