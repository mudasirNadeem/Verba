import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  purge: {
    options: {
      safelist: [
        "bg-yellow-300",
        "bg-gray-300",
        "bg-gray-400",
        "bg-zinc-300",
        "bg-zinc-400",
        "bg-red-300",
        "bg-green-300",
        "bg-cyan-300",
        "bg-fuchsia-300",
        "bg-yellow-400",
        "bg-green-400",
        "bg-cyan-400",
        "bg-fuchsia-400",
        "bg-red-400",
        "bg-indigo-400",
        // ... any other dynamically constructed classes
      ],
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "100px",
      md: "930px",
      lg: "1280px",
      full: "1700px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      green: colors.green,
      blue: colors.blue,
      yellow: colors.yellow,
      red: colors.red,
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        "bg-oxtari": "var(--bg-oxtari, #ffffff)",
        "bg-alt-oxtari": "var(--bg-alt-oxtari, #ffffff)",
        "button-oxtari": "var(--button-oxtari, #ffffff)",
        "button-hover-oxtari": "var(--button-hover-oxtari, #023eba)",
        "primary-oxtari": "var(--primary-oxtari, #023eba)",
        "secondary-oxtari": "var(--secondary-oxtari, #000000)",
        "warning-oxtari": "var(--warning-oxtari, #023eba)",
        "text-oxtari": "var(--text-oxtari, #000000)",
        "text-alt-oxtari": "var(--text-alt-oxtari, #023eba)",
        "text-oxtari-button": "var(--text-oxtari-button, #000000)",
        "text-alt-oxtari-button": "var(--text-alt-oxtari-button, #ffffff)",
        // New direct color utilities
        "primary-blue": "#023eba",
        "pure-white": "#ffffff",
        "pure-black": "#000000",
      },
      fontFamily: {
        "amiri": ["Amiri", "serif"],
        "crimson-pro": ["Crimson Pro", "Georgia", "serif"],
        "subtitle": ["Crimson Pro", "Georgia", "serif"],
        "sans": ["Amiri", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],

  daisyui: {
    themes: ["light", "dark"],
  },
};
export default config;
