import type { Post } from "#content-collections";
import { PostMeta } from "#components/post";
import { A } from "#components/primitives";
import { link } from "#shared/links";
import { getPosts } from "#utils/post";
import { SOCIALS } from "#utils/socials";

export function HomePage(): React.JSX.Element {
  const posts = getPosts();
  const hasPosts = posts.length > 0;

  return (
    <div className="col-start-2">
      <title>Emmanuel Chucks - Ambitious software engineer</title>
      <meta
        name="description"
        content="Emmanuel Chucks is a full-stack engineer based in Accra, Ghana. A passionate builder with an eye for pleasant design."
      />
      <main data-has-posts={hasPosts} className="grid content-center data-has-posts:min-h-[50svh]">
        <HomeHero />
        <SocialLinks />
        {hasPosts ? <PostsSection posts={posts} /> : null}
      </main>
    </div>
  );
}

function HomeHero() {
  return (
    <div className="grid grid-flow-col grid-cols-[auto_max-content] grid-rows-[repeat(2,max-content)] items-center gap-x-10 gap-y-1">
      <h1 className="text-4xl font-bold">Emmanuel Chucks</h1>
      <p className="text-neutral-600 dark:text-neutral-400">Ambitious software engineer</p>
      <img
        alt="Emmanuel Chucks in native clothing, smiling"
        src="/emmanuel-chucks.webp"
        className="size-16 rounded-full [@media_(min-width:445px)]:row-span-full"
      />
    </div>
  );
}

function SocialLinks() {
  return (
    <aside className="mt-6 flex flex-row flex-wrap gap-x-6 gap-y-2 font-semibold text-neutral-800 dark:text-neutral-200">
      {Object.values(SOCIALS).map((socialLink) => (
        <div key={socialLink.href} className="flex flex-row gap-x-2">
          <span aria-hidden="true">↗</span>
          <A href={socialLink.href}>{socialLink.text}</A>
        </div>
      ))}
    </aside>
  );
}

function PostsSection({ posts }: { posts: Post[] }) {
  return (
    <section className="mt-24">
      <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">Posts</h2>
      <ul className="mt-6 grid gap-y-14">
        {posts.map((post) => (
          <li key={post.id} className="grid gap-y-3">
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PostListItem({ post }: { post: Post }) {
  return (
    <>
      <PostHeading post={post} />
      <PostMeta post={post} />
    </>
  );
}

function PostHeading({ post }: { post: Post }) {
  return (
    <h3 className="text-2xl font-semibold">
      <A href={link("/posts/:slug", { slug: post.slug })}>
        {post.title}
        {post.isDraft ? <DraftBadge /> : null}
      </A>
    </h3>
  );
}

function DraftBadge() {
  return <span className="absolute ml-2 text-sm text-neutral-500 italic">(Draft)</span>;
}
