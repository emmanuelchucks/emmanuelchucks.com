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

type FrontMatter = Input<typeof frontmatterSchema>

const blogFiles = import.meta.glob<
	true,
	string,
	{ default: () => JSX.Element; frontmatter: FrontMatter }
>("~/content/blog/*.mdx", { eager: true })

const posts = Object.values(blogFiles)

parse(
	array(frontmatterSchema),
	posts.map((post) => post.frontmatter),
)

export function getPostsByQuery(query: string | undefined) {
	const allPosts = posts.map(({ frontmatter }) => {
		const slug = slugify(frontmatter.title.toLowerCase() + "-" + frontmatter.id)
		return {
			frontmatter: {
				...frontmatter,
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
