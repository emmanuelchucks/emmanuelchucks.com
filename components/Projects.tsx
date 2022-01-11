import Image from "next/image";
import Link from "next/link";
import projectsData from "../data/projects";
import siteData from "../data/site";
import Container from "./Container";
import ExternalLink from "./ExternalLink";

function Projects() {
  return (
    <section className="py-24 space-y-14">
      <Container as="header" className="py-0">
        <h2 id="projects" className="text-3xl font-bold">
          Projects
        </h2>
        <p className="mt-2">
          {
            "These are commercial projects I've done professionally. You can find my hobby and open source projects on "
          }
          <ExternalLink
            href={"https://" + siteData.socials[1][1] + "?tab=repositories"}
            text="GitHub"
          />
        </p>
      </Container>

      <Container className="grid gap-16 pt-8 lg:gap-24 md:grid-cols-2 lg:px-0 xl:max-w-6xl">
        {projectsData.map(({ name, description, highlights, image, link }) => (
          <article
            key={link}
            className="px-10 py-12 space-y-6 rounded-3xl text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-neutral-900"
          >
            <Image
              alt={`${name} logo`}
              src={image}
              width={1600}
              height={900}
              objectFit="cover"
            />
            <h3 className="text-4xl font-bold text-slate-500 dark:text-zinc-500">
              {name}
            </h3>
            <p>{description}</p>
            <ul className="list-disc list-inside">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link href={link}>
              <a className="block px-4 py-2 font-semibold transition-colors rounded-md max-w-fit text-slate-900 bg-slate-200 hover:bg-opacity-70 dark:bg-zinc-700 dark:text-zinc-100">
                Visit website &rarr;
              </a>
            </Link>
          </article>
        ))}
      </Container>
    </section>
  );
}

export default Projects;
