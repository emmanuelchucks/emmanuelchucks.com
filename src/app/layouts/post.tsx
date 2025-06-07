import type { LayoutProps } from "rwsdk/router";
import clsx from "clsx";
import * as v from "valibot";
import { DockedBrowserWindows } from "~/app/components/docked-browser-windows";
import { PostMeta } from "~/app/components/post";
import { A } from "~/app/components/primitives";
import { getPost, postParamsSchema } from "~/app/helpers/post";
import { SOCIALS } from "~/app/helpers/socials";

export function PostLayout({ requestInfo, children }: LayoutProps) {
  const validParams = v.parse(postParamsSchema, requestInfo?.params);
  const post = getPost(validParams.slug);

  if (!post) return;

  return (
    <>
      <header>
        <nav>
          <A
            href="/"
            className="font-medium text-neutral-800 dark:text-neutral-200"
          >
            <span aria-hidden="true">← </span>Home
          </A>
        </nav>
      </header>
      <main
        className={clsx(
          "mt-24",
          "prose prose-neutral dark:prose-invert",
          "prose-p:text-pretty",
          "prose-pre:bg-white prose-pre:dark:!bg-neutral-900",
          "prose-pre:outline-neutral-700 prose-pre:dark:outline-neutral-300",
          "prose-h1:text-balance prose-h2:text-balance prose-h3:text-balance",
          "[&_.shiki_span]:dark:!text-[var(--shiki-dark)]",
        )}
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
          <DockedBrowserWindows />
        </aside>
      </main>
    </>
  );
}
