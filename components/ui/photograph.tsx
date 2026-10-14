import Image from "next/image";
import type { StaticImageData } from "next/image";

type PhotographProps = {
  asset: { image: StaticImageData | string; alt: string };
  className: string;
  sizes: string;
  nodeId?: string;
  preload?: boolean;
};

export function Photograph({
  asset,
  className,
  sizes,
  nodeId,
  preload = false,
}: PhotographProps) {
  return (
    <div
      className={`${className.includes("absolute") ? "" : "relative"} w-full overflow-hidden ${className}`}
      data-node-id={nodeId}
    >
      <Image
        src={asset.image}
        alt={asset.alt}
        fill
        sizes={sizes}
        className="object-cover"
        placeholder={typeof asset.image === "string" ? "empty" : "blur"}
        unoptimized={
          typeof asset.image === "string" && asset.image.startsWith("https:")
        }
        preload={preload}
      />
    </div>
  );
}
