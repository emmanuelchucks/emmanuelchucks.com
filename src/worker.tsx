import { index, layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "~/app/document";
import { setCommonHeaders } from "~/app/headers";
import { MainLayout } from "~/app/layouts/main";
import { Home } from "~/app/pages/home";
import { PostLayout } from "./app/layouts/post";
import { Post } from "./app/pages/post";
import { link } from "./app/shared/links";

export interface AppContext {}

const app = defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(MainLayout, [
      index([Home]),
      layout(PostLayout, [route(link("/posts/:slug"), Post)]),
    ]),
  ]),
]);

export default app;
