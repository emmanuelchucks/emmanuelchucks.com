"use server"

import slugify from "@sindresorhus/slugify"
import { type JSX } from "solid-js"
import { array, coerce, object, parse, string, type Input } from "valibot"

function getPosts() {
	const frontmatterSchema = object({
		id: string("id is required"),
		title: string("title is required"),
		description: string("description is required"),
		author: string("author is required"),
		publishedAt: coerce(string("publishedAt is required"), (i) =>
			new Date(i as string).toISOString(),
		),
	})

	const blogFiles = import.meta.glob<
		true,
		string,
		{
			readonly default: () => JSX.Element
			frontmatter: Input<typeof frontmatterSchema>
			readingTime: { text: string }
		}
	>("~/content/blog/**/*.mdx", { eager: true })

	const posts = Object.values(blogFiles)

	parse(
		array(frontmatterSchema),
		posts.map((post) => post.frontmatter),
	)

	return posts
}

export function getPostsByQuery(query: string | undefined) {
	const posts = getPosts()
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
	const filteredPosts = allPosts.filter(
		({ frontmatter }) =>
			frontmatter.title.toLowerCase().includes(query.toLowerCase()) ||
			frontmatter.description.toLowerCase().includes(query.toLowerCase()),
	)
	return filteredPosts
}

export function getPostById(id: string) {
	const posts = getPosts()
	const uniquePart = id.split("-").at(-1)
	const post = posts.find((post) => post.frontmatter.id === uniquePart)
	if (!post) throw new Error(`No post found for id: ${id}`)
	return {
		content: post.default,
		frontmatter: {
			...post.frontmatter,
			publishedAt: formatDate(post.frontmatter.publishedAt, "long"),
			readTime: post.readingTime.text,
			url: `/blog/${id}`,
		},
	}
}

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
