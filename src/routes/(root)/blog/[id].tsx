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
				{formatDate(frontmatter.publishedAt, "long")}
			</time>
			<section class="min-w-0 [&_*_+_*]:my-6 dark:[&_.shiki_span]:!text-[--shiki-dark] [&_button]:cursor-default [&_h1]:text-balance [&_h1]:text-4xl [&_h1]:font-extrabold [&_p]:leading-7 [&_p]:text-neutral-700 dark:[&_p]:text-neutral-300 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-neutral-100 [&_pre]:p-4 [&_pre]:text-sm dark:[&_pre]:bg-neutral-900">
				<Content />
			</section>
		</div>
	)
}
