import { createRoute } from "honox/factory"
import { getPosts } from "../../../helpers/posts"

export default createRoute(async (c) => {
	const posts = getPosts()

	return c.render(
		<div>
			<h2>Posts</h2>
			<ul>
				{posts.map(async (post) => (
					<li>
						<a href={post.href}>{post.title}</a>
					</li>
				))}
			</ul>
		</div>,
		{
			title: "Blog - Emmanuel Chucks",
			description:
				"Writing about all things tech and design related, sharing everything I learn on my engineering journey.",
		},
	)
})
