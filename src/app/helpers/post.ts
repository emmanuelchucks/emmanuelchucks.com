import { env } from "cloudflare:workers";
import { allPosts } from "content-collections";
import { compareDesc } from "date-fns";
import * as v from "valibot";

export const postParamsSchema = v.object({
  slug: v.pipe(v.string(), v.nonEmpty("Slug is required")),
});

export function getPosts(filter = "") {
  return allPosts
    .filter(
      (post) =>
        !post.isDraft &&
        (post.title.toLowerCase().includes(filter.toLowerCase()) ||
          post.description.toLowerCase().includes(filter.toLowerCase())),
    )
    .sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));
}

export function getPost(slug: string) {
  const posts = getPosts();
  return posts.find((post) => post.id === slug.split("-").pop());
}

export async function getViewsCount(id: string) {
  return Number((await env.VIEWS_COUNTER.get(id)) ?? 2);
}

export async function getFormattedViewsCount(id: string) {
  return new Intl.NumberFormat().format(await getViewsCount(id));
}

export async function incrementViewsCount(id: string) {
  const viewsCount = await getViewsCount(id);
  await env.VIEWS_COUNTER.put(id, String(viewsCount + 1));
}
