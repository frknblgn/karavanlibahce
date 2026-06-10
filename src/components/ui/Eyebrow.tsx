import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  center,
  className,
  light,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.22em]",
        light ? "text-orange-soft" : "text-orange",
        center && "justify-center",
        className,
      )}
    >
      <span className="h-px w-7 bg-current opacity-60" aria-hidden />
      {children}
    </span>
  );
}
