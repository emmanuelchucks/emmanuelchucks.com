import { index, layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "~/app/document";
import { setCommonHeaders } from "~/app/headers";
import { MainLayout } from "~/app/layouts/main";
import { HomePage } from "~/app/pages/home";
import { PostLayout } from "./app/layouts/post";
import { PostPage } from "./app/pages/post";
import { link } from "./app/shared/links";

export interface AppContext {}

const app = defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(MainLayout, [
      index([HomePage]),
      layout(PostLayout, [route(link("/posts/:slug"), PostPage)]),
    ]),
  ]),
]);

export default app;
