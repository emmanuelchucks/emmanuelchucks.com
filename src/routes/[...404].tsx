import { HttpStatusCode } from "@solidjs/start"

export default function NotFound() {
	return (
		<main>
			<HttpStatusCode code={404} />
			<p>Not found</p>
		</main>
	)
}
