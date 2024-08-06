import slugify from "@sindresorhus/slugify";
import type { JSX } from "hono/jsx";
import type { HtmlEscapedString } from "hono/utils/html";
import * as v from "valibot";

const frontmatterSchema = v.object({
	id: v.string("id is required"),
	title: v.string("title is required"),
	description: v.string("description is required"),
	author: v.string("author is required"),
	publishedAt: v.pipe(
		v.string("publishedAt is required"),
		v.transform((value) => new Date(value)),
	),
});

const readingTimeSchema = v.object({
	text: v.string("reading time text is required"),
});

type MdxContent = (props: {
	components: Partial<JSX.IntrinsicElements> & Record<string, unknown>;
}) => HtmlEscapedString;

const posts = import.meta.glob<{
	frontmatter: v.InferInput<typeof frontmatterSchema>;
	readingTime: v.InferInput<typeof readingTimeSchema>;
	default: MdxContent;
}>("/posts/*.mdx", {
	eager: true,
});

export type Post = {
	Content: MdxContent;
	readingTime: string;
	href: string;
	id: string;
	title: string;
	description: string;
	author: string;
	publishedAt: string;
};

export function getPosts(filter = ""): Post[] {
	return Object.values(posts)
		.filter((post) =>
			post.frontmatter.title.toLowerCase().includes(filter.toLowerCase()),
		)
		.map((post) => {
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

			return {
				...post.frontmatter,
				Content: post.default,
				readingTime: post.readingTime.text,
				href: `/post/${slugify(post.frontmatter.title)}-${post.frontmatter.id}`,
			};
		});
}

export function getPost(href: string): Post | undefined {
	const posts = getPosts();
	return posts.find((post) => post.id === href.split("-").pop());
}
