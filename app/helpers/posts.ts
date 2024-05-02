import slugify from "@sindresorhus/slugify";
import * as v from "valibot";

type MdxContent = (props: {
	components: Partial<JSX.IntrinsicElements>;
}) => JSX.Element;

const frontmatterSchema = v.object({
	id: v.string("id is required"),
	title: v.string("title is required"),
	description: v.string("description is required"),
	author: v.string("author is required"),
	publishedAt: v.string("publishedAt is required"),
});

const readingTimeSchema = v.object({
	text: v.string("reading time text is required"),
});

const posts = import.meta.glob<{
	frontmatter: v.Input<typeof frontmatterSchema>;
	readingTime: v.Input<typeof readingTimeSchema>;
	default: MdxContent;
}>("/posts/*.mdx", {
	eager: true,
});

type Post = v.Output<typeof frontmatterSchema> & {
	Content: MdxContent;
	readingTime: string;
	href: string;
};

export function getPosts(filter = ""): Post[] {
	return Object.values(posts)
		.filter((post) =>
			post.frontmatter.title.toLowerCase().includes(filter.toLowerCase()),
		)
		.map((post) => {
			v.parse(frontmatterSchema, post.frontmatter);
			v.parse(readingTimeSchema, post.readingTime);

			return {
				...post.frontmatter,
				/* eslint-disable-next-line @typescript-eslint/naming-convention */
				Content: post.default,
				readingTime: post.readingTime.text,
				href: `/blog/${slugify(post.frontmatter.title)}-${post.frontmatter.id}`,
			};
		});
}
