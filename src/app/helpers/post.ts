import type { JSX } from "react";
import slugify from "@sindresorhus/slugify";
import { env } from "cloudflare:workers";
import * as v from "valibot";

export const postParamsSchema = v.object({
  slug: v.pipe(v.string(), v.nonEmpty("Slug is required")),
});

const frontmatterSchema = v.object({
  id: v.string("id is required"),
  title: v.string("title is required"),
  description: v.string("description is required"),
  author: v.string("author is required"),
  isDraft: v.boolean("isDraft is required"),
  publishedAt: v.pipe(
    v.string("publishedAt is required"),
    v.transform((value) => new Date(value)),
  ),
});

const readingTimeSchema = v.object({
  text: v.string("reading time text is required"),
});

type MdxContent = (
  props: Partial<{ components: Partial<JSX.IntrinsicElements> }>,
) => JSX.Element;

const postMdxFiles = import.meta.glob<{
  frontmatter: v.InferInput<typeof frontmatterSchema>;
  readingTime: v.InferInput<typeof readingTimeSchema>;
  default: MdxContent;
}>("/src/posts/**/article.mdx", {
  eager: true,
});

export interface Post {
  Content: MdxContent;
  readingTime: string;
  slug: string;
  id: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
}

export function getPosts(filter = "") {
  return Object.values(postMdxFiles)
    .filter(
      (post) =>
        !post.frontmatter.isDraft &&
        post.frontmatter.title.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) =>
      b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
    )
    .map((post) => {
      parsePost(post);

      return {
        ...post.frontmatter,
        Content: post.default,
        readingTime: post.readingTime.text,
        slug: `${slugify(post.frontmatter.title)}-${post.frontmatter.id}`,
      };
    });
}

export function getPost(slug: string) {
  const posts = getPosts();
  return posts.find((post) => post.id === slug.split("-").pop());
}

function parsePost(post: (typeof postMdxFiles)[number]) {
  v.parse(frontmatterSchema, post.frontmatter, {
    message(issue) {
      return `Invalid frontmatter for ${post.frontmatter.title}: ${issue.message}`;
    },
  });

  v.parse(readingTimeSchema, post.readingTime, {
    message(issue) {
      return `Invalid reading time for ${post.frontmatter.title}: ${issue.message}`;
    },
  });
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
