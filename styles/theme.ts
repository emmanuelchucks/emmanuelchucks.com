import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: () => ({
      html: {
        scrollBehavior: "smooth",
      },
    }),
  },
  fonts: {
    heading:
      "HeadingFont, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
});

export default customTheme;
