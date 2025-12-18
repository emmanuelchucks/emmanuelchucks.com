import type { Post } from "#content-collections";
import { link } from "#shared/links";
import slugify from "@sindresorhus/slugify";

interface PostBannerProps extends React.PropsWithChildren {
  post: Post;
}

export function PostBanner({ post, children }: PostBannerProps) {
  return (
    <figure>
      <div className="not-prose ms-[calc(-50vw+50%-var(--page-padding)/2)] w-[calc(100vw+var(--page-padding))] bg-neutral-50 py-16 dark:bg-neutral-950">
        {children}
      </div>
      <figcaption className="text-center">
        <a
          href={link("/demos/:slug", {
            slug: `${slugify(post.title)}-${post.id}`,
          })}
        >
          Live demo
        </a>
      </figcaption>
    </figure>
  );
}
