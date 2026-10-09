import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import { NewsExplorer } from "@/components/news/news-explorer";
import { NewsPublicInformation } from "@/components/news/public-information";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Updates on emergency coordination, partnerships and the work of the centre.",
};

export default function NewsMediaPage() {
  return (
    <InteriorPage
      title="News & Media"
      description="Updates on emergency coordination, partnerships and the work of the centre."
      breadcrumbs={[{ label: "News & Media" }]}
      nodeId="20:202"
    >
      <NewsExplorer />
      <NewsPublicInformation />
    </InteriorPage>
  );
}
