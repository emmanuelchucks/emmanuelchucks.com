import slugify from "@sindresorhus/slugify";
import type { JSX } from "hono/jsx";
import type { HtmlEscapedString } from "hono/utils/html";
import * as v from "valibot";

type MdxContent = (props: {
	components: Partial<JSX.IntrinsicElements> & Record<string, unknown>;
}) => HtmlEscapedString;

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

const posts = import.meta.glob<{
	frontmatter: v.InferInput<typeof frontmatterSchema>;
	readingTime: v.InferInput<typeof readingTimeSchema>;
	default: MdxContent;
}>("/posts/*.mdx", {
	eager: true,
});

export function getPosts(filter = "") {
	return Object.values(posts)
		.filter((post) =>
			post.frontmatter.title.toLowerCase().includes(filter.toLowerCase()),
		)
		.map((post) => {
			v.parse(frontmatterSchema, post.frontmatter);
			v.parse(readingTimeSchema, post.readingTime);

			return {
				...post.frontmatter,
				Content: post.default,
				readingTime: post.readingTime.text,
				href: `/blog/${slugify(post.frontmatter.title)}-${post.frontmatter.id}`,
			};
		});
}
