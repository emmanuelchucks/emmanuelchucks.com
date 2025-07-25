import type { LayoutProps } from "rwsdk/router";
import { DockedWindows } from "~/app/components/docked-windows";
import { PostMeta } from "~/app/components/post";
import { A } from "~/app/components/primitives";
import { SOCIALS } from "~/app/helpers/socials";
import { getPost } from "../helpers/post";

export async function PostLayout({ children }: LayoutProps) {
  const post = getPost();

  if (!post) return children;

  return (
    <>
      <title>{`${post.title} - Emmanuel Chucks`}</title>
      <header>
        <nav>
          <A
            href="/"
            className={`
              font-medium text-neutral-800
              dark:text-neutral-200
            `}
          >
            <span aria-hidden="true">← </span>Home
          </A>
        </nav>
      </header>
      <main
        className={`
          prose mt-24 prose-neutral
          dark:prose-invert
          prose-h1:text-balance
          prose-h2:text-balance
          prose-h3:text-balance
          prose-p:text-pretty
          prose-pre:bg-white prose-pre:outline-neutral-700
          prose-pre:dark:!bg-neutral-900 prose-pre:dark:outline-neutral-300
          [&_.shiki_span]:dark:!text-[var(--shiki-dark)]
        `}
      >
        <article>
          <header>
            <PostMeta post={post} />
            <h1>{post.title}</h1>
          </header>
          {children}
          <footer className="mt-16">
            <A href={SOCIALS.x.href}>
              <span aria-hidden>→ </span>@emmanuelchucks
            </A>
          </footer>
        </article>
        <aside>
          <DockedWindows />
        </aside>
      </main>
    </>
  );
}
