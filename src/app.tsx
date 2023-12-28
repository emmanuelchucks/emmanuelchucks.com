// @refresh reload
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import "./app.css"
import { RootLayout } from "./components/root-layout"

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
