import { action, cache, redirect } from "@solidjs/router"
import { type JSX } from "solid-js"
import { array, coerce, date, object, parse, string, type Input } from "valibot"

const frontmatterSchema = object({
	id: string("id is required"),
	title: string("title is required"),
	author: string("author is required"),
	publishedAt: coerce(
		date("publishedAt is required"),
		(i) => new Date(i as string),
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

export const getPostsByQuery = cache(async (query: string | undefined) => {
	"use server"
	const allPosts = posts.map(({ frontmatter }) => ({
		frontmatter: {
			...frontmatter,
			slug: `/blog/${frontmatter.title.toLowerCase()}-${frontmatter.id}`,
		},
	}))
	if (!query) return allPosts
	const filteredPosts = allPosts.filter(({ frontmatter }) =>
		frontmatter.title.toLowerCase().includes(query.toLowerCase()),
	)
	return filteredPosts
}, "posts")

export function getPostById(id: string) {
	const uniquePart = id.split("-").at(-1)
	const post = posts.find((post) => post.frontmatter.id === uniquePart)
	if (!post) throw new Error(`No post found for id: ${id}`)
	return post
}

export const handleSearchPosts = action(async (formData: FormData) => {
	"use server"
	const query = formData.get("q") as string
	/* eslint-disable-next-line @typescript-eslint/no-throw-literal */
	throw redirect("/blog?q=" + query)
})
