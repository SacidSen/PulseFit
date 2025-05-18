/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2ECC71",
          primaryDark: "#27AE60",
          black: "#000000",
          white: "#FFFFFF",
          grayLight: "#F4F4F4",
          grayDark: "#333333",
        },
        container: {
          center: true,
          padding: '1rem',
          screens: {
            sm: "400px",   // example for small container max-width
            md: "640px",
            lg: "768px",
            xl: "1024px",
          },
        },
      },
    },
    plugins: [],
};
  