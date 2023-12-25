import { createRoute } from "sonik/factory"

export default createRoute((c) => {
	return c.render(
		<main>
			<article class="grid gap-y-4 leading-7">
				<h1 class="sr-only">Full-Stack Software Engineer</h1>
				<p class="rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-center font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
					<span class="sr-only">Send me an email: </span>
					<a
						href="mailto:hi@emmanuelchucks.com?subject=Mail from Website"
						class="underline underline-offset-4"
					>
						hi@emmanuelchucks.com
					</a>
				</p>
				<p>
					In the digital realm, a coder emerges as a modern artisan, traversing
					the realms of front-end and back-end with the grace of a seasoned
					knight.
				</p>
				<p>
					Armed with obnoxious TypeScript skills, he weaves intricate digital
					tapestries that captivate all who behold them, employing algorithms as
					finely tuned as celestial lyres.
				</p>
				<p>
					A maestro of version control, he wields Git with the finesse of
					Solomon's wisdom, ensuring no pull request goes astray in the bustling
					land of startupshire.
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
					His name echoes through the annals of tech history as a beacon of both
					humor and skill, a full-stack engineer who, like a digital troubadour,
					brings laughter and functionality to the kingdom of Silicon.
				</p>
			</article>
		</main>,
		{
			title: "Emmanuel Chucks - Full-Stack Software Engineer",
			meta: [
				{
					name: "description",
					content:
						"In the digital realm, a coder emerges as a modern artisan, traversing the realms of front-end and back-end with the grace of a seasoned knight.",
				},
			],
		},
	)
})
