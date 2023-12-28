import { HttpStatusCode } from "@solidjs/start"

export default function NotFound() {
	return (
		<main class="grid place-content-center gap-y-2 text-center">
			<HttpStatusCode code={404} />
			<p class="text-8xl">𝟜⓪𝟺</p>
			<h1>Page not found</h1>
		</main>
	)
}
