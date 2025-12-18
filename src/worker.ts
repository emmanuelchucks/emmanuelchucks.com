import type { Post } from "#content-collections";
import { layout, render, route } from "rwsdk/router";
import { defineApp, requestInfo } from "rwsdk/worker";
import { Document } from "./app/document";
import { setCommonHeaders } from "./app/headers";
import { MainLayout } from "./app/layouts/main";
import { PostLayout } from "./app/layouts/post";
import { DemoPage } from "./app/pages/demo";
import { HomePage } from "./app/pages/home";
import { PostPage } from "./app/pages/post";
import { getPost } from "./app/utils/post";

export interface AppContext {
  post: Post;
}

export const app = defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(MainLayout, [
      route("/", HomePage),
      layout(PostLayout, [route("/posts/:slug", [findPost, PostPage])]),
    ]),
    route("/demos/:slug", [findPost, DemoPage]),
  ]),
]);

function findPost() {
  const post = getPost();

  if (!post) {
    return new Response("Post not found", {
      status: 404,
    });
  }

  requestInfo.ctx.post = post;
}

export type App = typeof app;
export default app;
