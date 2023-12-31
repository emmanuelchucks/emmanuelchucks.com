import { type JSX } from "solid-js"

const blogFiles = import.meta.glob<
	true,
	string,
	{
		default: () => JSX.Element
		frontmatter: { id: string; title: string }
	}
>("~/content/blog/*.mdx", { eager: true })

const posts = Object.values(blogFiles)

export function getAllPosts() {
	return posts.map(({ frontmatter, ...rest }) => ({
		...rest,
		frontmatter: {
			...frontmatter,
			slug: `/blog/${frontmatter.title.toLowerCase()}-${frontmatter.id}`,
		},
	}))
}

export function getPostById(id: string) {
	const uniquePart = id.split("-").at(-1)
	const post = posts.find((post) => post.frontmatter.id === uniquePart)
	if (!post) throw new Error(`No post found for id: ${id}`)
	return post
}
