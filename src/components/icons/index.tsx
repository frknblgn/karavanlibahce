import type { SVGProps } from "react";
import type { IconName } from "@/types";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Facility / pricing line icons. */
export const icons: Record<IconName, (p: IconProps) => JSX.Element> = {
  bolt: (p) => (<svg {...base} {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>),
  drop: (p) => (<svg {...base} {...p}><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z" /></svg>),
  shower: (p) => (<svg {...base} {...p}><path d="M4 20V8a4 4 0 0 1 4-4 3 3 0 0 1 3 3" /><circle cx="13" cy="7" r="2" /><path d="M9 14v1M13 16v1M17 14v1M11 18v1M15 19v1" /></svg>),
  wifi: (p) => (<svg {...base} {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></svg>),
  users: (p) => (<svg {...base} {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" /></svg>),
  shield: (p) => (<svg {...base} {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  paw: (p) => (<svg {...base} {...p}><circle cx="6" cy="11" r="1.6" /><circle cx="10" cy="7" r="1.6" /><circle cx="14" cy="7" r="1.6" /><circle cx="18" cy="11" r="1.6" /><path d="M8 16c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5-1.8 3-4 3-4-1-4-3z" /></svg>),
  flame: (p) => (<svg {...base} {...p}><path d="M12 3c1 3-1.5 4-1.5 6.5A2 2 0 0 0 12 11a2 2 0 0 0 1.8-3C15 9 16 11 16 14a4 4 0 1 1-8 0c0-3 4-5 4-11z" /></svg>),
  caravan: (p) => (<svg {...base} {...p} strokeWidth={1.5}><path d="M3 16V8a2 2 0 0 1 2-2h12a4 4 0 0 1 4 4v6h-3" /><path d="M3 16h6" /><circle cx="12" cy="16" r="2" /><rect x="6" y="9" width="4" height="3" /></svg>),
  tent: (p) => (<svg {...base} {...p} strokeWidth={1.5}><path d="M3 20 12 5l9 15" /><path d="M2.5 20h19" /><path d="M9.5 20v-3a2.5 2.5 0 0 1 5 0v3" /></svg>),
  sun: (p) => (<svg {...base} {...p} strokeWidth={1.5}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>),
};

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const C = icons[name];
  return <C {...props} />;
}

/* ---- Standalone glyphs used in chrome / CTAs ---- */

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.987-1.045zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2.1z" /></svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ExpandIcon = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={1.8}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={1.8}><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={1.8}><path d="M15 18l-6-6 6-6" /></svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={1.8}><path d="M9 18l6-6-6-6" /></svg>
);
