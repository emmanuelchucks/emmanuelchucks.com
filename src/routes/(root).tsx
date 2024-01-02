import { useMatch } from "@solidjs/router"
import { For, type JSX } from "solid-js"

const navigationLinks = [
	{ name: "Home", href: "/" },
	{ name: "Blog", href: "/blog" },
]

function NavItem(props: NavigationLink) {
	const isMatch = useMatch(() => props.href)
	return (
		<li>
			<a
				href={props.href}
				aria-current={isMatch() ? "page" : undefined}
				class="decoration-2 underline-offset-2 hover:underline"
			>
				{props.name}
			</a>
		</li>
	)
}

export default function RootLayout(props: { children: JSX.Element }) {
	return (
		<div class="mx-4 my-16 grid items-start sm:mx-8 md:mx-auto md:grid-cols-[auto_65ch_auto]">
			<div class="grid gap-y-16 md:col-start-2">
				<header class="font-semibold text-neutral-700 dark:text-neutral-300">
					<nav>
						<ul class="flex flex-row gap-x-8">
							<For each={navigationLinks}>
								{(link) => <NavItem {...link} />}
							</For>
						</ul>
					</nav>
				</header>
				{props.children}
			</div>
		</div>
	)
}

type NavigationLink = (typeof navigationLinks)[number]
