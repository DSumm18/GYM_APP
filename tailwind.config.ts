import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00FFFF",
          green: "#00FF00",
          lime: "#39FF14",
        },
        dark: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1a1a25",
          600: "#232330",
        },
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.neon.green'), 0 0 20px theme('colors.neon.green')",
        "neon-cyan": "0 0 5px theme('colors.neon.cyan'), 0 0 20px theme('colors.neon.cyan')",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00FF00, 0 0 10px #00FF00" },
          "100%": { boxShadow: "0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
