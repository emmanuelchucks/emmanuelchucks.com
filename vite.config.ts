import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import { react as reactConfig } from "@kasoa/vite-plus-config/react";
import tailwindcss from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react";
import { redwood } from "rwsdk/vite";
import { defineConfig } from "vite-plus";
import { createMdxPlugin } from "./config/mdx.js";

export default defineConfig({
  ...reactConfig,
  plugins: [
    createMdxPlugin(),
    reactPlugin({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    cloudflare({
      viteEnvironment: {
        name: "worker",
      },
    }),
    redwood(),
    tailwindcss(),
    contentCollections(),
  ],
});
