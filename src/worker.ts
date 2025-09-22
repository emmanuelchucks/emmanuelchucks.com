import type { Post } from "content-collections";
import { layout, render, route } from "rwsdk/router";
import { defineApp, requestInfo } from "rwsdk/worker";
import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { MainLayout } from "./app/layouts/main";
import { PostLayout } from "./app/layouts/post";
import { Post as PostPage } from "./app/pages/post";
import { link } from "./app/shared/links";
import { getPost } from "./app/utils/post";

declare module "rwsdk/worker" {
  interface DefaultAppContext {
    post: Post;
  }
}

function findPost() {
  const post = getPost();

  if (!post) {
    return new Response("Post not found", {
      status: 404,
    });
  }

  requestInfo.ctx.post = post;
}

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(MainLayout, [
      route("/", Home),
      layout(PostLayout, [route(link("/posts/:slug"), [findPost, PostPage])]),
    ]),
  ]),
]);
