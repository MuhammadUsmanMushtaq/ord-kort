/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        112: "28rem",
      },
      animation: {
        flip: "flip 0.6s ease-in-out",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(0)" },
          "100%": { transform: "rotateY(180deg)" },
        },
      },
    },
  },
  plugins: [],
};
