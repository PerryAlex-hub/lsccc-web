// Homepage review destinations. Switch to interior routes at the next checkpoint.
export const destinations = {
  home: "/",
  about: "/#about",
  mandate: "/#mandate",
  partners: "/#partners",
  emergency: "/#emergency",
  safety: "/#resources",
  news: "/#news",
  contact: "/#contact",
  beforeYouCall: "/#before-you-call",
  government: "https://lagosstate.gov.ng/",
  governmentServices: "https://lagosstate.gov.ng/services/",
  citizensGate: "https://citizensgate.lagosstate.gov.ng/",
} as const;

export const navigation = [
  { label: "Home", href: destinations.home },
  { label: "About us", href: destinations.about },
  { label: "Emergency services", href: destinations.emergency },
  { label: "Safety resources", href: destinations.safety },
  { label: "News & media", href: destinations.news },
  { label: "Contact", href: destinations.contact },
] as const;

export const searchablePages = [
  {
    title: "About the centre",
    description: "Our mandate, management and operations",
    href: destinations.about,
  },
  {
    title: "Emergency services",
    description: "Emergency assistance, 112 and 767",
    href: destinations.emergency,
  },
  {
    title: "Safety resources",
    description: "Public information and official guidance",
    href: destinations.safety,
  },
  {
    title: "News & media",
    description: "LERMS, training and agency collaboration",
    href: destinations.news,
  },
  {
    title: "Response partners",
    description: "LASEMA, fire, ambulance, traffic and police",
    href: destinations.partners,
  },
  {
    title: "Before you call",
    description: "Location, incident details and callback information",
    href: destinations.beforeYouCall,
  },
  {
    title: "Contact & enquiries",
    description: "General, media and partnership enquiries",
    href: destinations.contact,
  },
] as const;
