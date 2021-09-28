import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: () => ({
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        fontSize: "lg",
      },
    }),
  },
  fonts: {
    heading:
      "Wotfard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    body: "Wotfard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  components: {
    Link: {
      baseStyle: {
        color: "gray.600",
      },
    },
  },
});

export default customTheme;
