import { DockedWindows } from "#components/docked-windows";
import { PostMeta } from "#components/post";
import { A } from "#components/primitives";
import { getPost } from "#utils/post";
import { SOCIALS } from "#utils/socials";

export function PostLayout({ children }: React.PropsWithChildren) {
  const post = getPost();

  if (!post) {
    return <div className="col-start-2">{children}</div>;
  }

  return (
    <div className="col-start-2">
      <title>{`${post.title} - Emmanuel Chucks`}</title>
      <header>
        <BackToHomeLink />
      </header>
      <main className="prose prose-neutral dark:prose-invert prose-h1:text-balance prose-h2:text-balance prose-h3:text-balance prose-p:text-pretty prose-pre:bg-white prose-pre:outline-neutral-700 prose-pre:dark:bg-neutral-900! prose-pre:dark:outline-neutral-300 mt-24 [&_.shiki_span]:dark:text-(--shiki-dark)!">
        <article>
          <header>
            <PostMeta post={post} />
            <PostTitle isDraft={post.isDraft} title={post.title} />
          </header>
          {children}
          <footer className="mt-16">
            <XProfileLink />
          </footer>
        </article>
        <aside>
          <DockedWindows />
        </aside>
      </main>
    </div>
  );
}

function BackToHomeLink() {
  return (
    <nav>
      <A href="/" className="font-medium text-neutral-800 dark:text-neutral-200">
        <span aria-hidden="true">← </span>Home
      </A>
    </nav>
  );
}

function PostTitle({ isDraft, title }: { isDraft: boolean; title: string }) {
  return (
    <h1>
      {title}
      {isDraft ? <DraftBadge /> : null}
    </h1>
  );
}

function DraftBadge() {
  return <span className="absolute ml-2 text-sm text-neutral-500 italic">(Draft)</span>;
}

function XProfileLink() {
  return (
    <A href={SOCIALS.x.href}>
      <span aria-hidden>→ </span>@emmanuelchucks
    </A>
  );
}
