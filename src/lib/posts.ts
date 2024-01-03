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

const posts = Object.values(blogFiles)

parse(
	array(frontmatterSchema),
	posts.map((post) => post.frontmatter),
)

export function getPostsByQuery(query: string | undefined) {
	const allPosts = posts.map(({ frontmatter, readingTime }) => {
		const slug = slugify(frontmatter.title.toLowerCase() + "-" + frontmatter.id)
		return {
			frontmatter: {
				...frontmatter,
				publishedAt: formatDate(frontmatter.publishedAt, "short"),
				readTime: readingTime.text,
				url: `/blog/${slug}`,
			},
		}
	})
	if (!query) return allPosts
	const filteredPosts = allPosts.filter(({ frontmatter }) =>
		frontmatter.title.toLowerCase().includes(query.toLowerCase()),
	)
	return filteredPosts
}

export function getPostById(id: string) {
	const uniquePart = id.split("-").at(-1)
	const post = posts.find((post) => post.frontmatter.id === uniquePart)
	if (!post) throw new Error(`No post found for id: ${id}`)
	return {
		...post,
		frontmatter: {
			...post.frontmatter,
			publishedAt: formatDate(post.frontmatter.publishedAt, "long"),
			readTime: post.readingTime.text,
			url: `/blog/${id}`,
		},
	}
}

export const searchPosts = action(async (formData: FormData) => {
	"use server"
	const query = parse(string(), formData.get("q"))
	/* eslint-disable-next-line @typescript-eslint/no-throw-literal */
	throw redirect("/blog?q=" + query)
})

function formatDate(date: string, type: "short" | "long") {
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
