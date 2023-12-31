import { useParams } from "@solidjs/router"
import { getPostById } from "~/lib/posts"

export default function Post() {
	const parmas = useParams()
	const { default: Content } = getPostById(parmas.id)

	return (
		<div class="prose dark:prose-invert prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900">
			<Content />
		</div>
	)
}
