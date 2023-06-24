module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2b6653",
        onPrimary: "#f2f2f2",
        secondary: "#ff6c0f",
        onSecondary: "#f2f2f2",
        surface: "#f2f2f2",
        onSurface: "#1b1b1b",
        background: "#ffffff",
        onBackground: "#000000",
        lightGray: "#dddddd",
        darkGray: "#777777",
      },
      fontFamily: {
        gugi: ["Gugi", "cursive"],
        "noto-sans-kr": ["Noto Sans KR", "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [],
};
