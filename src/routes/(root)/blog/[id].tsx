import { Meta, Title } from "@solidjs/meta"
import {
	cache,
	createAsync,
	type RouteDefinition,
	type RouteSectionProps,
} from "@solidjs/router"
import { getPostById } from "~/lib/posts"

const getPostByIdData = cache(getPostById, "post")

export const route = {
	load({ params }) {
		void getPostByIdData(params.id)
	},
} satisfies RouteDefinition

export default function Post(props: RouteSectionProps) {
	const post = createAsync(async () => getPostByIdData(props.params.id))

	return (
		<>
			<Title>{post()?.frontmatter.title} - Emmanuel Chucks</Title>
			<Meta name="description" content={post()?.frontmatter.description} />
			<main class="grid gap-y-4">
				<div class="flex flex-row items-baseline gap-x-2 text-neutral-600 dark:text-neutral-400">
					<time dateTime={post()?.frontmatter.publishedAt} class="font-medium">
						{post()?.frontmatter.publishedAt}
					</time>
					<span aria-hidden="true" class="text-sm">
						-
					</span>
					<p class="text-sm">{post()?.frontmatter.readTime}</p>
				</div>
				<article class="prose prose-neutral min-w-0 dark:prose-invert prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900 dark:[&_.shiki_span]:!text-[--shiki-dark]">
					{post()?.content()}
				</article>
			</main>
		</>
	)
}
