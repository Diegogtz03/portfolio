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
        "dark-bg": "#161616"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'monitor-lines': 'repeating-linear-gradient(transparent, #00000044 0.5em)'
      },
      boxShadow: {
        'monitor': '5px 0 18rem #031e11',
        'monitor-lines': '5px 5px 25px #14fdce20',
        'monitor-shadow': 'inset 0 0 18rem black, inset 0 0 3rem black, 0 0 10rem black;'
      },
      keyframes: {
        dots: {
          '0%, 20%': { content: "''" },
          '40%': { content: "'.'" },
          '60%': { content: "'..'" },
          '80%, 100%': { content: "'...'" },
        }
      },
      animation: {
        dots: 'dots 1.5s steps(3, end) infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      fontSize: {
        '12xl': '14rem'
      }
    },
  },
  plugins: [],
};
export default config;
