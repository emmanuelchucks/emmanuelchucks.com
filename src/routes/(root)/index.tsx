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
				<div class="grid gap-y-4 leading-7 text-neutral-700 dark:text-neutral-300">
					<p>
						In the digital realm, a coder emerges as a modern artisan,
						traversing the realms of front-end and back-end with the grace of a
						seasoned knight.
					</p>
					<p>
						Armed with obnoxious TypeScript skills, he weaves intricate digital
						tapestries that captivate all who behold them, employing algorithms
						as finely tuned as celestial lyres.
					</p>
					<p>
						A maestro of version control, he wields Git with the finesse of
						Solomon's wisdom, ensuring no pull request goes astray in the
						bustling land of startupshire.
					</p>
					<p>
						His code commits, adorned with memes and punctuated with puns,
						transform even mundane stand-up meetings into comedic galas.
					</p>
					<p>
						Facing bugs and errors with a hearty laugh, he knows each fix is a
						step closer to the digital nirvana sought by kings and queens of the
						industry.
					</p>
					<p>
						In the marketplace of ideas, he is a savvy trader, seamlessly
						translating the desires of stakeholders into code that dances like
						David before the Ark.
					</p>
					<p>
						His name echoes through the annals of tech history as a beacon of
						both humor and skill, a full-stack engineer who, like a digital
						troubadour, brings laughter and functionality to the kingdom of
						Silicon.
					</p>
				</div>
			</article>
		</main>
	)
}
