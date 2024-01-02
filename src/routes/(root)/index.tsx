import profilePicture from "~/assets/images/emmanuel-chucks.webp"

export default function Home() {
	return (
		<main>
			<article class="grid gap-y-8">
				<header class="grid grid-flow-col grid-cols-[auto_max-content] grid-rows-[repeat(2,_minmax(0,_max-content))] items-center gap-x-4 text-neutral-950 dark:text-neutral-50">
					<h1 class="text-4xl font-bold">Emmanuel Chucks</h1>
					<p class="text-neutral-600 dark:text-neutral-400">
						Ambitious software engineer
					</p>
					<img
						src={profilePicture}
						alt="Emmanuel Chucks smiling"
						width={64}
						height={64}
						class="size-16 rounded-full sm:row-span-2"
					/>
				</header>
				<aside class="flex flex-row flex-wrap gap-x-6 gap-y-2 font-semibold text-neutral-800 dark:text-neutral-200">
					<div class="flex flex-row gap-x-2">
						<span>↗</span>
						<a
							href="mailto:hi@emmanuelchucks.com?subject=Mail from Website"
							class="underline underline-offset-4"
						>
							Send me an email
						</a>
					</div>
					<div class="flex flex-row gap-x-2">
						<span>↗</span>
						<a
							href="https://x.com/emmanuelchucks"
							class="underline underline-offset-4"
						>
							Connect on X
						</a>
					</div>
					<div class="flex flex-row gap-x-2">
						<span>↗</span>
						<a
							href="https://github.com/emmanuelchucks"
							class="underline underline-offset-4"
						>
							GitHub
						</a>
					</div>
				</aside>
				<div class="grid max-w-[34em] gap-y-4 leading-7 text-neutral-700 dark:text-neutral-300">
					<p>
						In the vast expanse of the digital realm, he emerges as a coding
						virtuoso, effortlessly navigating front-end intricacies and
						sculpting back-end landscapes with the finesse of Typescript.
					</p>
					<p>
						Wielding the artistry of version control, he directs the symphony of
						code using Git, ensuring a seamless dance of branches and merges,
						all harmoniously deployed and protected under the watchful gaze of
						Cloudflare.
					</p>
					<p>
						His commit messages, a blend of puns and memes, infuse levity into
						mundane stand-up meetings, turning bug-squashing sessions into
						moments of hearty laughter. With each resolved error, he strides
						closer to the elusive digital nirvana, an AWS-powered kingdom sought
						by tech monarchs.
					</p>
					<p>
						In the marketplace of ideas, he is a shrewd trader, effortlessly
						translating stakeholder aspirations into a choreography of code and
						design that gracefully pirouettes through the dynamic landscape of
						modern technologies.
					</p>
					<p>
						His name echoes as a beacon of both humor and expertise, a
						full-stack artisan who seamlessly weaves these technological
						elements into the ever-evolving tapestry of Silicon's landscape.
					</p>
				</div>
			</article>
		</main>
	)
}
