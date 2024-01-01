import { For } from "solid-js"
import { getAllPosts } from "~/lib/posts"

export default function Blog() {
	const posts = getAllPosts()

	return (
		<For each={posts}>
			{(post) => <a href={post.frontmatter.slug}>{post.frontmatter.title}</a>}
		</For>
	)
}
