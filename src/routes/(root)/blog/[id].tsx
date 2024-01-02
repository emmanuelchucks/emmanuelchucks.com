import { Meta, Title } from "@solidjs/meta"
import { useParams } from "@solidjs/router"
import { formatDate, getPostById } from "~/lib/posts"

export default function Post() {
	const parmas = useParams()
	const { default: Content, frontmatter } = getPostById(parmas.id)

	return (
		<>
			<Title>{frontmatter.title} - Emmanuel Chucks</Title>
			<Meta name="description" content={frontmatter.description} />
			<main class="grid gap-y-4">
				<time
					dateTime={frontmatter.publishedAt}
					class="text-sm text-neutral-600 dark:text-neutral-400"
				>
					{formatDate(frontmatter.publishedAt, "long")}
				</time>
				<article class="prose prose-neutral min-w-0 dark:prose-invert prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900 dark:[&_.shiki_span]:!text-[--shiki-dark]">
					<Content />
				</article>
			</main>
		</>
	)
}
