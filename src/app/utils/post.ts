import type { Post } from "content-collections";
import { env } from "cloudflare:workers";
import { allPosts } from "content-collections";
import { compareDesc } from "date-fns";
import { requestInfo } from "rwsdk/worker";
import * as v from "valibot";

const postsParamsSchema = v.object({
  q: v.optional(v.string(), ""),
});

const postParamsSchema = v.object({
  slug: v.pipe(v.string(), v.nonEmpty("Slug is required")),
});

export function getPosts(): Post[] {
  const validParams = v.parse(postsParamsSchema, requestInfo.params);
  return allPosts
    .filter(
      (post) =>
        !(import.meta.env.PROD && post.isDraft) &&
        (post.title.toLowerCase().includes(validParams.q.toLowerCase()) ||
          post.description.toLowerCase().includes(validParams.q.toLowerCase())),
    )
    .sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));
}

export function getPost(): Post | undefined {
  const posts = getPosts();
  const validParams = v.parse(postParamsSchema, requestInfo.params);
  return posts.find((post) => post.id === validParams.slug.split("-").pop());
}

export async function getViewsCount(id: string): Promise<number> {
  return Number((await env.VIEWS_COUNTER.get(id)) ?? 2);
}

export async function getFormattedViewsCount(id: string): Promise<string> {
  return new Intl.NumberFormat().format(await getViewsCount(id));
}

export async function incrementViewsCount(id: string): Promise<void> {
  const viewsCount = await getViewsCount(id);
  await env.VIEWS_COUNTER.put(id, String(viewsCount + 1));
}
