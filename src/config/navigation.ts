import type { NavLink } from "@/types";

/**
 * Primary navigation — labels resolve from dictionaries (nav.<key>).
 * Hrefs are route-prefixed ("/#…") so they work from any page, not just home.
 */
export const navLinks: NavLink[] = [
  { href: "/#experience", key: "experience" },
  { href: "/#facilities", key: "facilities" },
  { href: "/#gallery", key: "gallery" },
  { href: "/#pricing", key: "pricing" },
  { href: "/#nearby", key: "nearby" },
  { href: "/#faq", key: "faq" },
  { href: "/#contact", key: "contact" },
];

/** Footer link columns reuse the same keys. */
export const footerLinks: NavLink[] = [
  { href: "/#experience", key: "experience" },
  { href: "/#gallery", key: "gallery" },
  { href: "/#pricing", key: "pricing" },
  { href: "/blog", key: "blog" },
  { href: "/#contact", key: "contact" },
];
