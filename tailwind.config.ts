import { type Config } from "tailwindcss";
import defaultTheme, { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],

  theme: {
    screens: {
      //overlapping is necessary
      start: { min: "0px", max: "46em" },
      xs: { min: "0px", max: "30em" },
      between: { min: "30em", max: "46em" },
      sm: { min: "46em" },

      // ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        cta_image:
          "url('/bg-tablet-pattern.svg'), url('/bg-tablet-pattern.svg')",
        hero_image: "url('/bg-tablet-pattern.svg')",
      },
      backgroundPosition: {
        cta_image_position: "-15rem -5rem, 80rem -36rem",
        // hero_image_position: "top right",
        hero_image_position: "bottom left",
      },
      gridAutoColumns: {
        "1fr": "minmax(auto, 1fr)",
      },

      colors: {
        drop_shadow_start: "rgb(0, 0, 0, 0)",
        drop_shadow_end: "rgb(0, 0, 0, 0.8)",

        primary_400: "hsl(var(--color-primary-400))",
        accent_400: "hsl(var(--color-accent-400))",
        accent_300: "hsl(var(--color-accent-300))",
        accent_100: "hsl(var(--color-accent-100))",
        neutral_200: "hsl(var(--color-neutral-200))",
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
      boxShadow: {
        button: "0 1.125em 1em -1em var(--css-color-accent-500)",
        nav: "0 0 0.75em rgb(0, 0, 0, 0.05)",
        list_title: "5em 0 0 hsl(var(--color-accent-100))",
      },
      fontSize: {
        fs_primary_heading: "2.5rem",
        fs_secondary_heading: "1.875rem",
        fs_nav: "0.85rem",
      },
      spacing: {
        non_mobile_nav_gap: "clamp(1rem, 5vw, 3rem)",
        footer_nav_gap: "clamp(0.5rem, 15vw, 5rem)",
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
