// @refresh reload
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import { RootLayout } from "~/components/root-layout"
import "./app.css"

export default function App() {
	return (
		<Router
			root={(props) => (
				<>
					<RootLayout>
						<Suspense>{props.children}</Suspense>
					</RootLayout>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
