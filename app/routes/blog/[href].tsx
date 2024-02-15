import { createRoute } from "honox/factory"
import { getPosts } from "../../../helpers/posts"

export default createRoute(async (c) => {
	const posts = getPosts()
	const post = posts.find((post) => c.req.param("href").includes(post.id))

	if (!post) {
		return c.notFound()
	}

	return c.render(
		<article>
			<post.Content />
		</article>,
	)
})
