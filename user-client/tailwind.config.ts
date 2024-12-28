import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primaryLight: "var(--primary-light)",
        textWhite: "var(--text-white)",
        textHeading: "var(--text-heading)",
        textSubheading: "var(--text-subheading)",
        text: "var(--text)",
      },
    },
  },
  plugins: [],
} satisfies Config;
