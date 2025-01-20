// @ts-expect-error - required for image import
import profilePicture from "~/assets/emmanuel-chucks.jpeg?w=128&format=webp&as=metadata";

import { cx } from "hono/css";
import { createRoute } from "honox/factory";
import { A } from "~/components/a";
import { PostMeta } from "~/components/post-meta";
import { type Post, getPosts } from "~/helpers/posts";
import { SOCIALS } from "~/helpers/socials";

export default createRoute((c) => {
	const posts = getPosts();

	return c.render(
		<main>
			<div
				class={cx(
					"grid grid-flow-col items-center gap-x-10 gap-y-1",
					"grid-cols-[auto_max-content] grid-rows-[repeat(2,_max-content)]",
				)}
			>
				<h1 class="text-4xl font-bold">Emmanuel Chucks</h1>
				<p class="text-neutral-600 dark:text-neutral-400">
					Ambitious software engineer
				</p>
				<img
					alt="Emmanuel Chucks in native clothing, smiling"
					src={profilePicture.src}
					width={profilePicture.width}
					height={profilePicture.height}
					class="size-16 rounded-full [@media_(min-width:445px)]:row-span-full"
				/>
			</div>

			<aside
				class={cx(
					"mt-6 font-semibold",
					"text-neutral-800 dark:text-neutral-200",
					"flex flex-row flex-wrap gap-x-6 gap-y-2",
				)}
			>
				{SOCIALS.map((link) => (
					<div key={link.href} class="flex flex-row gap-x-2">
						<span aria-hidden="true">↗</span>
						<A href={link.href}>{link.text}</A>
					</div>
				))}
			</aside>

			{Boolean(posts.length) && (
				<section class="mt-24">
					<h2 class="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
						Posts
					</h2>
					<ul class="mt-6 grid gap-y-14">
						{posts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</ul>
				</section>
			)}
		</main>,
		{
			title: "Emmanuel Chucks - Full-Stack Engineer",
			description:
				"Emmanuel Chucks is a full-stack engineer based in Accra, Ghana. A passionate builder with an eye for pleasant design.",
		},
	);
});

function PostCard({ key, post }: { key: string; post: Post }) {
	return (
		<li key={key} class="grid gap-y-3">
			<h3 class="text-2xl font-semibold">
				<A href={post.href}>{post.title}</A>
			</h3>
			<PostMeta post={post} />
			<p class={cx("line-clamp-3", "text-neutral-700 dark:text-neutral-300")}>
				{post.description}
			</p>
		</li>
	);
}
