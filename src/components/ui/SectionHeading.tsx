import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light,
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <Reveal
      className={cn(
        "max-w-[680px]",
        center && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow center={center} light={light}>
        {eyebrow}
      </Eyebrow>
      <Tag
        className={cn(
          "mt-[18px] text-[clamp(34px,5.2vw,58px)]",
          light && "text-white",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p className={cn("lead mt-[22px]", light && "!text-white/80")}>{lead}</p>
      )}
    </Reveal>
  );
}
