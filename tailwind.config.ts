import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary_400: "hsl(var(--color-primary-400))",
      accent_400: "hsl(var(--color-accent-400))",
      accent_100: "hsl(var(--color-accent-100))",
      neutral_100: "hsl(var(--color-neutral-100))",
      neutral_900: "hsl(var(--color-neutral-900))",

      text_primary_400: "hsl(var(--color-primary-400))",
      text_accent_400: "hsl(var(--color-accent-400))",
      text_accent_100: "hsl(var(--color-accent-100))",
      text_neutral_100: "hsl(var(--color-neutral-100))",
      text_neutral_900: "hsl(var(--color-neutral-900))",

      bg_primary_400: "hsl(var(--color-primary-400))",
      bg_accent_400: "hsl(var(--color-accent-400))",
      bg_accent_100: "hsl(var(--color-accent-100))",
      bg_neutral_100: "hsl(var(--color-neutral-100))",
      bg_neutral_900: "hsl(var(--color-neutral-900))",

      fs_primary_heading: "(var(--fs-primary-heading)",
      fs_secondary_heading: "(var(--fs-secondary-heading)",
    },
    extend: {
      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
        sans: ["var(--font-primary)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
