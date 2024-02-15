import slugify from "@sindresorhus/slugify"
import * as v from "valibot"

const frontmatterSchema = v.object({
	id: v.string("id is required"),
	title: v.string("title is required"),
	description: v.string("description is required"),
	author: v.string("author is required"),
	publishedAt: v.string("publishedAt is required"),
})

const readingTimeSchema = v.object({
	text: v.string("text is required"),
})

const posts = import.meta.glob<{
	frontmatter: v.Input<typeof frontmatterSchema>
	readingTime: v.Input<typeof readingTimeSchema>
	default: () => JSX.Element
}>("/posts/*.mdx", {
	eager: true,
})

export function getPosts() {
	return Object.values(posts).map((post) => {
		v.parse(frontmatterSchema, post.frontmatter)
		v.parse(readingTimeSchema, post.readingTime)

		return {
			...post.frontmatter,
			/* eslint-disable-next-line @typescript-eslint/naming-convention */
			Content: post.default,
			readingTime: post.readingTime.text,
			href: `/blog/${slugify(
				post.frontmatter.title.toLowerCase() + "-" + post.frontmatter.id,
			)}`,
		}
	})
}
