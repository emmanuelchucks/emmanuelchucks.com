import type { Post } from "#content-collections";
import { PostMeta } from "#components/post";
import { A } from "#components/primitives";
import { link } from "#shared/links";
import { getPosts } from "#utils/post";
import { SOCIALS } from "#utils/socials";

const selectedWork = [
  {
    name: "drizzle-expo-sqlite",
    href: "https://github.com/emmanuelchucks/drizzle-expo-sqlite",
    description: "Expo + Drizzle + SQLite notes app with local-first data patterns.",
  },
  {
    name: "patchmarks.nvim",
    href: "https://github.com/emmanuelchucks/patchmarks.nvim",
    description: "File-oriented Git review annotations for Neovim.",
  },
  {
    name: "DataMeter",
    href: "https://github.com/emmanuelchucks/DataMeter",
    description: "macOS app for tracking per-app network data usage locally.",
  },
  {
    name: "GroqDictate",
    href: "https://github.com/emmanuelchucks/GroqDictate",
    description: "macOS menu bar dictation app using Groq Whisper.",
  },
  {
    name: "kasoa",
    href: "https://github.com/emmanuelchucks/kasoa",
    description: "Shared TypeScript tooling packages and configs.",
  },
  {
    name: "cloudflare-link-preview",
    href: "https://github.com/emmanuelchucks/cloudflare-link-preview",
    description: "Cloudflare Worker + Hono + React link preview app.",
  },
];

export function HomePage(): React.JSX.Element {
  const posts = getPosts();
  const hasPosts = posts.length > 0;

  return (
    <div className="col-start-2">
      <title>Emmanuel Chucks - Product software across mobile, backend, AI, and devtools</title>
      <meta
        name="description"
        content="Emmanuel Chucks builds product software across mobile, backend, AI workflows, and developer tools. Based in Accra, Ghana."
      />
      <main className="grid gap-y-20">
        <HomeHero />
        <SelectedWork />
        {hasPosts ? <PostsSection posts={posts} /> : null}
      </main>
    </div>
  );
}

function HomeHero() {
  return (
    <section className="grid gap-y-8">
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3">
        <div className="grid gap-y-3">
          <p className="font-medium text-neutral-600 dark:text-neutral-400">Accra, Ghana</p>
          <h1 className="text-4xl leading-tight font-bold text-balance">Emmanuel Chucks</h1>
        </div>
        <img
          alt="Emmanuel Chucks in native clothing, smiling"
          src="/emmanuel-chucks.webp"
          className="size-16 rounded-full"
        />
      </div>

      <div className="grid max-w-2xl gap-y-5 text-lg leading-8 text-neutral-700 dark:text-neutral-300">
        <p>I build product software across mobile, backend, AI workflows, and developer tools.</p>
        <p>
          I currently work across the stack at Celedom, mostly around React Native, TypeScript,
          Cloudflare, Hono, Drizzle, app releases, testing, and the bits of infrastructure a small
          product team needs to keep moving.
        </p>
      </div>

      <SocialLinks />
    </section>
  );
}

function SocialLinks() {
  return (
    <aside className="flex flex-row flex-wrap gap-x-6 gap-y-2 font-semibold text-neutral-800 dark:text-neutral-200">
      {Object.values(SOCIALS).map((socialLink) => (
        <div key={socialLink.href} className="flex flex-row gap-x-2">
          <span aria-hidden="true">↗</span>
          <A href={socialLink.href}>{socialLink.text}</A>
        </div>
      ))}
    </aside>
  );
}

function SelectedWork() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
        Selected work
      </h2>
      <ul className="mt-6 grid gap-y-7">
        {selectedWork.map((project) => (
          <li key={project.href} className="grid gap-y-2">
            <h3 className="text-2xl font-semibold">
              <A href={project.href}>{project.name}</A>
            </h3>
            <p className="leading-7 text-neutral-700 dark:text-neutral-300">
              {project.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PostsSection({ posts }: { posts: Post[] }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">Writing</h2>
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
