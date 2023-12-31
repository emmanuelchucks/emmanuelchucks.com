import { For } from "solid-js"
import { getAllPosts } from "~/lib/posts"

export default function Blog() {
	const posts = getAllPosts()
	console.log(posts)

	return (
		<div class="prose dark:prose-invert prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900">
			<For each={posts}>
				{(post) => <a href={post.frontmatter.slug}>{post.frontmatter.title}</a>}
			</For>
		</div>
	)
}
