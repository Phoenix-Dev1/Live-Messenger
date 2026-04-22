import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ash: {
          50: '#f9f9f9',
          100: '#efefef',
          200: '#cccccc',
          800: '#333333',
          900: '#111111',
          950: '#0a0a0a',
        },
        forest: {
          500: '#2c4c3b',
          600: '#1e382a',
          900: '#0d1c14',
        }
      },
      borderRadius: {
        none: '0',
        sm: '1px',
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '4px',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
export default config;
