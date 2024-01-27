import { type Config } from "tailwindcss";
import defaultTheme, { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],

  theme: {
    screens: {
      "standard-sm": "50em",
      ...defaultTheme.screens,
    },
    extend: {
      gridAutoColumns: {
        "1fr": "minmax(auto, 1fr)",
      },
      boxShadow: {
        button: "0 1.125em 1em -1em var(--css-color-accent-500)",
        nav: "0 0 0.75em rgb(0, 0, 0, 0.05)",
      },

      colors: {
        drop_shadow_start: "rgb(0, 0, 0, 0)",
        drop_shadow_end: "rgb(0, 0, 0, 0.8)",

        primary_400: "hsl(var(--color-primary-400))",
        accent_400: "hsl(var(--color-accent-400))",
        accent_300: "hsl(var(--color-accent-300))",
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
      },
      fontSize: {
        fs_primary_heading: "2.5rem",
        fs_secondary_heading: "1.875rem",
        fs_nav: "0.85rem",
      },
      spacing: {
        non_mobile_nav_gap: "clamp(1rem, 5vw, 3rem)",
      },

      // fontWeight: {
      //   fw_bold: "700",
      //   fw_semi_bold: "500",
      //   fw_regular: "400",
      // },

      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
        sans: ["var(--font-primary)"],
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
