import { createTheme } from "@mui/material/styles";

const nimbusTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#E6005C",
      light: "rgba(230,0,92,0.6)",
      dark: "#5C0025",
    },
    secondary: {
      main: "#333399",
      light: "rgba(51,51,153,0.6)",
    },
    background: {
      default: "#f0f0f0",
      dark: "#29297A",
    },
    text: {
      primary: "#282828",
      secondary: "#9a9a9a",
    },
  },
  typography: {
    headingsFont: '"Bebas Neue", sans-serif',
    fontFamily: '"Inconsolata", sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h2: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h3: {
      fontFamily: '"Inconsolata", sans-serif',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 30,
  },
});

export default nimbusTheme;