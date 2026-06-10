import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#3E5F44",
          deep: "#2C3F31",
          darker: "#213127",
          soft: "#5E8C61",
        },
        brown: { DEFAULT: "#A27B5C" },
        orange: { DEFAULT: "#D98324", soft: "#E39A4C" },
        beige: { DEFAULT: "#F5F1E8", deep: "#ECE5D6" },
        cream: "#FBF9F4",
        ink: { DEFAULT: "#1C1C1C", soft: "#46443E" },
        muted: "#6E6B62",
        line: "#DED7C6",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        lg: "10px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(28,28,28,.05), 0 4px 16px rgba(28,28,28,.05)",
        md: "0 8px 30px rgba(33,49,39,.10), 0 2px 8px rgba(33,49,39,.06)",
        lg: "0 30px 70px rgba(33,49,39,.18)",
      },
      maxWidth: {
        wrap: "1280px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(.22,.61,.36,1)",
      },
      keyframes: {
        cue: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(300%)" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 6px rgba(217,131,36,.35), 0 0 0 14px rgba(217,131,36,.18)" },
          "70%": { boxShadow: "0 0 0 16px rgba(217,131,36,0), 0 0 0 30px rgba(217,131,36,0)" },
          "100%": { boxShadow: "0 0 0 6px rgba(217,131,36,0), 0 0 0 14px rgba(217,131,36,0)" },
        },
      },
      animation: {
        cue: "cue 2.2s cubic-bezier(.22,.61,.36,1) infinite",
        pulse: "pulse 2.4s cubic-bezier(.22,.61,.36,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
