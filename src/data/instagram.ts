import content from "@/content/cms/data/instagram.json";
import type { Tone } from "@/types";

export const instagram = content.items as { id: string; image: string; tone: Tone }[];
