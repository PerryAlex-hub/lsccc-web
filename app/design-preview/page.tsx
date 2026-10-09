import type { Metadata } from "next";
import Image from "next/image";
import { assets } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Design foundation review",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Navy", value: "#09284B", className: "bg-navy" },
  { name: "Blue", value: "#0057A8", className: "bg-blue" },
  { name: "Gold", value: "#F4B400", className: "bg-gold" },
  { name: "Ink", value: "#18212D", className: "bg-ink" },
  { name: "Muted", value: "#56616F", className: "bg-muted" },
  { name: "Paper", value: "#F3F5F7", className: "bg-paper" },
  { name: "Border", value: "#DCE1E7", className: "bg-border" },
  { name: "Red", value: "#E83B50", className: "bg-red" },
  { name: "Green", value: "#32C76D", className: "bg-green" },
  { name: "White", value: "#FFFFFF", className: "bg-white" },
];

const photographs = [
  { asset: assets.operations, caption: "Centre operations" },
  { asset: assets.lermsEngagement, caption: "LERMS stakeholder engagement" },
  { asset: assets.frscEngagement, caption: "FRSC engagement" },
  { asset: assets.responderTraining, caption: "First responder training" },
];

export default function DesignPreview() {
  return (
    <main className="site-container section-space space-y-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-eyebrow font-bold text-blue">STAGE 1 / FOUNDATION REVIEW</p>
        <h1 className="text-page font-extrabold text-navy">LSCCC design foundation</h1>
        <p className="text-body text-muted">
          Review the Figma palette, Plus Jakarta Sans typography and original
          assets. This temporary review page will be removed before launch.
        </p>
      </div>

      <section aria-labelledby="palette-heading" className="space-y-6">
        <h2 id="palette-heading" className="text-section font-bold text-navy">Colour palette</h2>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {colours.map((colour) => (
            <div key={colour.name} className="space-y-2">
              <div className={`h-20 border border-border ${colour.className}`} />
              <p className="text-sm font-bold">{colour.name}</p>
              <p className="text-xs text-muted">{colour.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="type-heading" className="space-y-6 border-t border-border pt-10">
        <h2 id="type-heading" className="text-section font-bold text-navy">Typography</h2>
        <div className="space-y-6 bg-paper p-6 sm:p-10">
          <p className="text-eyebrow font-bold text-navy">PLUS JAKARTA SANS / REGULAR TO EXTRA BOLD</p>
          <p className="max-w-[810px] text-page font-bold text-navy md:text-hero">
            Coordinating emergency response.<br className="hidden md:block" />
            {" "}Serving the people of Lagos.
          </p>
          <p className="text-section font-bold text-ink">News &amp; public information</p>
          <p className="max-w-3xl text-lead text-ink">
            Connecting emergency calls with the agencies that respond.
          </p>
          <p className="max-w-3xl text-body text-muted">
            LSCCC manages communication through Lagos State’s emergency helplines
            and coordinates with relevant response agencies.
          </p>
          <p className="text-sm font-semibold text-navy">Emergency lines: 112 / 767</p>
        </div>
      </section>

      <section aria-labelledby="identity-heading" className="space-y-6 border-t border-border pt-10">
        <h2 id="identity-heading" className="text-section font-bold text-navy">Official identity assets</h2>
        <div className="flex flex-wrap gap-10">
          {[assets.lagosCrest, assets.lscccEmblem].map((asset) => (
            <figure key={asset.figmaNodeId} className="space-y-4">
              <Image src={asset.image} alt={asset.alt} width={80} height={80} className="size-20 object-contain" />
              <figcaption className="max-w-64 text-sm text-muted">{asset.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="photography-heading" className="space-y-6 border-t border-border pt-10">
        <h2 id="photography-heading" className="text-section font-bold text-navy">Original photography</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {photographs.map(({ asset, caption }) => (
            <figure key={asset.figmaNodeId} className="space-y-3">
              <Image
                src={asset.image}
                alt={asset.alt}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 45vw, 640px"
                className="h-auto w-full"
                placeholder="blur"
              />
              <figcaption className="text-sm font-semibold text-navy">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
