import type { MDXContent as DefaultMDXContent } from "@content-collections/mdx/react";
import child_process from "node:child_process";
import path from "node:path";
import process from "node:process";
import { promisify } from "node:util";
import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import slugify from "@sindresorhus/slugify";
import readingTime from "reading-time";
import * as v from "valibot";

const exec = promisify(child_process.exec);
const contentPath = "./src/content/";

type MDXContent = (
  props: Partial<React.ComponentProps<typeof DefaultMDXContent>>,
) => React.JSX.Element;

const posts = defineCollection({
  name: "posts",
  directory: contentPath,
  include: "**/*.mdx",
  schema: v.object({
    id: v.string(),
    title: v.string(),
    description: v.string(),
    author: v.string(),
    isDraft: v.boolean(),
    publishedAt: v.pipe(
      v.string(),
      v.transform((value) => new Date(value)),
    ),
  }),
  transform: async (document, context) => {
    const mdxContent = createDefaultImport<MDXContent>(
      path.join(process.cwd(), contentPath, document._meta.filePath),
    );

    const updatedAt = await context.cache(
      document._meta.filePath,
      async (filePath) => {
        const { stdout } = await exec(
          `git log -1 --format=%ai -- ${filePath.split("/").pop() ?? ""}`,
        );

        return stdout
          ? new Date(stdout.trim()).toISOString()
          : new Date().toISOString();
      },
    );

    return {
      ...document,
      readingTime: readingTime(document.content).text,
      slug: `${slugify(document.title)}-${document.id}`,
      updatedAt,
      mdxContent,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
