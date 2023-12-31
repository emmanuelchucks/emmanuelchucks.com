import Content from "~/content/hello.mdx"

export default function Blog() {
	return (
		<div class="prose dark:prose-invert prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900">
			<Content />
		</div>
	)
}
