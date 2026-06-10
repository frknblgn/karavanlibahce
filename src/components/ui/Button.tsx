import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "dark" | "outline" | "whatsapp";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-white shadow-[0_10px_26px_rgba(217,131,36,.32)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(217,131,36,.40)]",
  ghost:
    "bg-white/10 text-white border border-white/55 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5",
  dark: "bg-green text-white hover:bg-green-deep hover:-translate-y-0.5",
  outline:
    "border border-line text-ink hover:border-green hover:text-green hover:-translate-y-0.5",
  whatsapp:
    "bg-[#25D366] text-[#0b3d23] shadow-[0_10px_26px_rgba(37,211,102,.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(37,211,102,.42)]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-[15px] text-[15px] font-semibold tracking-[0.01em] transition-[transform,background,color,box-shadow] duration-300 ease-brand [&_svg]:h-[18px] [&_svg]:w-[18px]";

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const classes = cn(baseClass, variants[variant], className);

  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, href, ...rest } = props;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
