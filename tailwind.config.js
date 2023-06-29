/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "470px" },
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-dark": "var(--primary-dark)",
        "primary-darker": "var(--primary-darker)",
        "primary-lightest": "var(--primary-lightest)",
        "gray-text": "var(--gray-text)",
        "dark-mode": "var(--dark-mode)",
        "dark-light": "var(--dark-light)",
      },
    },
  },
  plugins: [],
};
