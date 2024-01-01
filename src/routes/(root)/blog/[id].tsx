import { useParams } from "@solidjs/router"
import { formatDate, getPostById } from "~/lib/posts"

export default function Post() {
	const parmas = useParams()
	const { default: Content, frontmatter } = getPostById(parmas.id)

	return (
		<div class="grid gap-y-2">
			<time
				dateTime={frontmatter.publishedAt}
				class="text-sm text-neutral-600 dark:text-neutral-400"
			>
				{formatDate(frontmatter.publishedAt)}
			</time>
			<section class="prose prose-neutral min-w-0 dark:prose-invert prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900">
				<Content />
			</section>
		</div>
	)
}
