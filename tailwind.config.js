module.exports = {
  purge: [
    "./components/Feed.js",
    "./components/Feeds.js",
    "./components/Form.js",
    "./components/Navbar.js",
    "pages/index.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ["Noto Sans Display"],
      },
      colors: {
        richBlack: "#0A0A0A",
        eerieBlack: "#141414",
        jet: "#292929",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
