import { InteriorPage } from "@/components/ui/interior-page";
import { Section } from "@/components/ui/section";

export function ArticleLoading() {
  return (
    <InteriorPage
      title="News & Media"
      description="Loading article…"
      breadcrumbs={[{ label: "News & Media" }]}
    >
      <Section className="grid gap-12 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div aria-hidden="true" className="space-y-6">
          <div className="h-11 w-2/3 bg-paper" />
          <div className="aspect-[16/10] bg-paper" />
          <div className="h-6 w-full bg-paper" />
          <div className="h-6 w-5/6 bg-paper" />
          <div className="h-6 w-3/4 bg-paper" />
        </div>
        <div
          aria-hidden="true"
          className="h-80 border-t-4 border-gold bg-paper"
        />
      </Section>
    </InteriorPage>
  );
}
