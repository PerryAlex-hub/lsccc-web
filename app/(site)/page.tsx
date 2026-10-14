import { notFound } from "next/navigation";
import { getWebsitePage, getSiteSettings } from "@/lib/cms/public";
import {
  HomeHero,
  HomeLeadStory,
  HomeNews,
  HomeAbout,
  HomePartners,
  HomeGallery,
  HomeResources,
} from "@/components/home/sections";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    title: { absolute: settings.siteName },
    description: settings.description,
  };
}

export default async function Home() {
  const page = await getWebsitePage("/");
  if (!page || page.status !== "PUBLISHED") {
    notFound();
  }
  return (
    <div data-node-id="32:682">
      <HomeHero />
      {page.body && page.body !== page.introduction && (
        <div className="site-container whitespace-pre-line py-8 text-body text-muted">
          {page.body}
        </div>
      )}
      <HomeLeadStory />
      <HomeNews />
      <HomeAbout />
      <HomePartners />
      <HomeGallery />
      <HomeResources />
    </div>
  );
}
