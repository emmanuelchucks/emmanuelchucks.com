import type { Post } from "content-collections";
import { index, layout, render, route } from "rwsdk/router";
import { defineApp, requestInfo } from "rwsdk/worker";
import { Document } from "~/app/document";
import { setCommonHeaders } from "~/app/headers";
import { MainLayout } from "~/app/layouts/main";
import { HomePage } from "~/app/pages/home";
import { getPost } from "./app/helpers/post";
import { PostLayout } from "./app/layouts/post";
import { PostPage } from "./app/pages/post";
import { link } from "./app/shared/links";

export interface AppContext {
  post: Post;
}

async function findPost() {
  const post = getPost();

  if (!post) {
    return new Response("Post not found", {
      status: 404,
    });
  }

  requestInfo.ctx.post = post;
}

const app = defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(MainLayout, [
      index([HomePage]),
      layout(PostLayout, [route(link("/posts/:slug"), [findPost, PostPage])]),
    ]),
  ]),
]);

export default app;
