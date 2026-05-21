import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          ink: "#1d2524",
          mist: "#eff4f1",
          paper: "#fbfaf6",
          clay: "#b66a4b",
          moss: "#58735b",
          tide: "#326b72",
          sun: "#d8a03d"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(29, 37, 36, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
