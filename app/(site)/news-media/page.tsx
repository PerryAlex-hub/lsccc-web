import { getPageMetadata } from "@/lib/cms/public";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import { NewsExplorer } from "@/components/news/news-explorer";
import { NewsPublicInformation } from "@/components/news/public-information";
import { getPublishedNews } from "@/lib/news/repository";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/news-media");
}

export default async function NewsMediaPage() {
  return (
    <InteriorPage
      image="lermsEngagement"
      cmsPath="/news-media"
      title="News & Media"
      description="Updates on emergency coordination, partnerships and the work of the centre."
      breadcrumbs={[{ label: "News & Media" }]}
      nodeId="20:202"
    >
      <NewsExplorer articles={await getPublishedNews()} />
      <NewsPublicInformation />
    </InteriorPage>
  );
}
