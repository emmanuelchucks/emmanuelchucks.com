import slugify from "@sindresorhus/slugify"
import { action, redirect } from "@solidjs/router"
import { type JSX } from "solid-js"
import { array, coerce, object, parse, string, type Input } from "valibot"

const frontmatterSchema = object({
	id: string("id is required"),
	title: string("title is required"),
	description: string("description is required"),
	author: string("author is required"),
	publishedAt: coerce(string("publishedAt is required"), (i) =>
		new Date(i as string).toISOString(),
	),
})

const blogFiles = import.meta.glob<true, string, MdxFile>(
	"~/content/blog/**/*.mdx",
	{ eager: true },
)

const allPosts = Object.values(blogFiles).map(
	({ frontmatter, readingTime, ...rest }) => {
		const slug = slugify(frontmatter.title.toLowerCase() + "-" + frontmatter.id)
		return {
			...rest,
			frontmatter: {
				...frontmatter,
				readTime: readingTime.text,
				url: `/blog/${slug}`,
			},
		}
	},
)

parse(
	array(frontmatterSchema),
	allPosts.map((post) => post.frontmatter),
)

export function getPostsByQuery(query: string | undefined) {
	if (!query) return allPosts
	const filteredPosts = allPosts.filter(({ frontmatter }) =>
		frontmatter.title.toLowerCase().includes(query.toLowerCase()),
	)
	return filteredPosts
}

export function getPostById(id: string) {
	const uniquePart = id.split("-").at(-1)
	const post = allPosts.find((post) => post.frontmatter.id === uniquePart)
	if (!post) throw new Error(`No post found for id: ${id}`)
	return post
}

export function formatDate(date: string, type: "short" | "long") {
	if (type === "short")
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	return new Date(date).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

export const handleSearchPosts = action(async (formData: FormData) => {
	"use server"
	const query = formData.get("q") as string
	/* eslint-disable-next-line @typescript-eslint/no-throw-literal */
	throw redirect("/blog?q=" + query)
})

type FrontMatter = Input<typeof frontmatterSchema>

type ReadingTime = {
	text: string
	minutes: number
	time: number
	words: number
}

type MdxFile = {
	readonly default: (props: {
		components?: Record<string, JSX.Element>
	}) => JSX.Element
	frontmatter: FrontMatter
	readingTime: ReadingTime
}
