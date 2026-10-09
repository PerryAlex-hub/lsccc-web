import { newsArticles } from "@/lib/content/news";
import { safetyTopics } from "@/lib/content/safety";
import type { AdminState } from "./types";

export const adminNavigation = [
  { label: "Overview", href: "/admin", icon: "overview" },
  { label: "News & articles", href: "/admin/news", icon: "news" },
  { label: "Public notices", href: "/admin/notices", icon: "notice" },
  { label: "Safety resources", href: "/admin/resources", icon: "shield" },
  { label: "Website pages", href: "/admin/pages", icon: "pages" },
  { label: "Media library", href: "/admin/media", icon: "image" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
] as const;

export const initialAdminState: AdminState = {
  version: 1,
  articles: [
    ...newsArticles.map((article) => ({
      id: article.slug,
      title: article.title,
      slug: article.slug,
      excerpt: article.description,
      body: article.paragraphs.join("\n\n"),
      category: article.category,
      status: "Published" as const,
      coverId: article.asset.image.src,
      author: "Editorial team",
      updatedAt: article.dateTime,
    })),
    {
      id: "quarterly-coordination-draft",
      title: "Quarterly response coordination update",
      slug: "quarterly-response-coordination-update",
      excerpt: "",
      body: "",
      category: "Coordination",
      status: "Draft",
      coverId: "",
      author: "Editorial team",
      updatedAt: "2026-10-09",
    },
  ],
  media: Array.from(
    new Map(
      newsArticles.map((article) => [
        article.asset.image.src,
        {
          id: article.asset.image.src,
          name:
            article.asset.image.src.split("/").pop()?.split(".")[0] ??
            "Photograph",
          url: article.asset.image.src,
          alt: article.asset.alt,
          size: `${article.asset.image.width} × ${article.asset.image.height}px`,
        },
      ]),
    ).values(),
  ),
  notices: [
    {
      id: "emergency-lines",
      title: "Emergency assistance",
      summary: "Lagos State emergency lines: 112 and 767. Available 24 hours.",
      body: "For urgent assistance anywhere in Lagos State, call 112 or 767.",
      url: "/emergency-services",
      status: "Published",
      updatedAt: "2026-05-18",
    },
    {
      id: "keep-lines-open",
      title: "Keep the lines open",
      summary: "Hoax calls obstruct access for people needing emergency help.",
      body: "Use emergency lines for incidents requiring immediate assistance. Visit Before You Call for the information to provide to a call agent.",
      url: "/before-you-call",
      status: "Published",
      updatedAt: "2026-05-18",
    },
  ],
  resources: safetyTopics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    summary: topic.description,
    body: topic.description,
    url: topic.href,
    status: "Published" as const,
    updatedAt: "2026-05-20",
  })),
  pages: [
    {
      id: "home",
      title: "Homepage",
      url: "/",
      summary: "Coordinating emergency response. Serving the people of Lagos.",
    },
    {
      id: "about",
      title: "About the centre",
      url: "/about",
      summary: "Our mandate, operations and response partners.",
    },
    {
      id: "emergency",
      title: "Emergency services",
      url: "/emergency-services",
      summary:
        "Emergency numbers, incident reporting and what happens when you call.",
    },
    {
      id: "safety",
      title: "Safety resources",
      url: "/safety-resources",
      summary: "Guides for safety awareness and emergency preparedness.",
    },
    {
      id: "news",
      title: "News & Media",
      url: "/news-media",
      summary:
        "Updates on coordination, partnerships and the work of the centre.",
    },
    {
      id: "contact",
      title: "Contact",
      url: "/contact",
      summary: "General enquiries, media requests and partnership information.",
    },
    {
      id: "before-call",
      title: "Before You Call",
      url: "/before-you-call",
      summary: "What to tell a call agent when reporting an incident.",
    },
  ].map((page) => ({
    ...page,
    body: page.summary,
    status: "Published" as const,
    updatedAt: "2026-05-20",
  })),
  settings: {
    siteName: "Lagos State Command & Control Centre",
    description:
      "Coordinating emergency response. Serving the people of Lagos.",
    address:
      "Governor’s Road, opposite the Deputy Governor’s Office, Alausa, Ikeja, Lagos State, Nigeria.",
    enquiryEmail: "",
  },
  activity: [],
};
