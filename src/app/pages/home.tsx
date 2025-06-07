import { clsx } from "clsx";
import { PostMeta } from "~/app/components/post";
import { A } from "~/app/components/primitives";
import { getPosts } from "~/app/helpers/post";
import { SOCIALS } from "~/app/helpers/socials";

export function Home() {
  const posts = getPosts();

  return (
    <div
      className={clsx(
        "mx-auto my-24",
        "w-[min(100%-var(--spacing)*8,_var(--container-2xl))]",
        "sm:w-[min(100%-var(--spacing)*24,_var(--container-2xl))]",
      )}
    >
      <title>Emmanuel Chucks - Ambitious software engineer</title>
      <meta
        name="description"
        content="Emmanuel Chucks is a full-stack engineer based in Accra, Ghana. A passionate builder with an eye for pleasant design."
      />
      <main
        className={clsx(!posts.length && "grid min-h-[50svh] content-center")}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center gap-x-10 gap-y-1",
            "grid-cols-[auto_max-content] grid-rows-[repeat(2,_max-content)]",
          )}
        >
          <h1 className="text-4xl font-bold">Emmanuel Chucks</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Ambitious software engineer
          </p>
          <img
            alt="Emmanuel Chucks in native clothing, smiling"
            src="/emmanuel-chucks.webp"
            className="size-16 rounded-full [@media_(min-width:445px)]:row-span-full"
          />
        </div>

        <aside
          className={clsx(
            "mt-6 font-semibold",
            "text-neutral-800 dark:text-neutral-200",
            "flex flex-row flex-wrap gap-x-6 gap-y-2",
          )}
        >
          {Object.values(SOCIALS).map((link) => (
            <div key={link.href} className="flex flex-row gap-x-2">
              <span aria-hidden="true">↗</span>
              <A href={link.href}>{link.text}</A>
            </div>
          ))}
        </aside>

        {Boolean(posts.length) && (
          <section className="mt-24">
            <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
              Posts
            </h2>
            <ul className="mt-6 grid gap-y-14">
              {posts.map((post) => (
                <li key={post.id} className="grid gap-y-3">
                  <h3 className="text-2xl font-semibold">
                    <A href={`/post/${post.slug}`}>{post.title}</A>
                  </h3>
                  <PostMeta post={post} />
                  <p
                    className={clsx(
                      "line-clamp-3",
                      "text-neutral-700 dark:text-neutral-300",
                    )}
                  >
                    {post.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
