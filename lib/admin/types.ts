export type PublicationStatus = "Draft" | "Published";
export type ContentCollection = "notices" | "resources" | "pages";

export type AdminArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  status: PublicationStatus;
  coverId: string;
  author: string;
  updatedAt: string;
};

export type AdminMedia = {
  id: string;
  name: string;
  url: string;
  alt: string;
  size: string;
};

export type AdminContent = {
  id: string;
  title: string;
  summary: string;
  body: string;
  url: string;
  status: PublicationStatus;
  updatedAt: string;
};

export type AdminSettings = {
  siteName: string;
  description: string;
  address: string;
  enquiryEmail: string;
};

export type AdminActivity = {
  id: string;
  label: string;
  date: string;
};

export type AdminState = {
  version: 1;
  articles: AdminArticle[];
  media: AdminMedia[];
  notices: AdminContent[];
  resources: AdminContent[];
  pages: AdminContent[];
  settings: AdminSettings;
  activity: AdminActivity[];
  team: AdminTeamMember[];
  categories: string[];
};

export type AdminRole = "Administrator" | "Editor";
export type MemberStatus = "Active" | "Invited" | "Revoked" | "Deactivated";

export type AdminTeamMember = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: MemberStatus;
  token: string;
  expiresAt: string | null;
  owner?: boolean;
};
