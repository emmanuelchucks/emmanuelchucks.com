import Image from "next/image";
import Link from "next/link";
import projectsData from "../data/projects";
import siteData from "../data/site";

function Projects() {
  return (
    <section className="py-24 bg-slate-100 dark:bg-[#1e2021]">
      <header id="projects" className="container px-4 mx-auto lg:max-w-4xl">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p>
          {
            "These are commercial projects I've done professionally. You can find my hobby and open source projects on "
          }
          <Link
            href={"https://" + siteData.socials[1][1] + "?tab=repositories"}
          >
            <a className="underline transition-opacity text-slate-900 underline-offset-2 hover:opacity-80 dark:text-zinc-300">
              Github
            </a>
          </Link>
        </p>
      </header>

      <div className="container grid gap-16 px-4 mx-auto mt-16 lg:gap-24 md:grid-cols-2 lg:px-16 lg:max-w-6xl">
        {projectsData.map(({ name, description, highlights, image, link }) => (
          <article
            key={link}
            className="space-y-6 text-slate-700 dark:text-zinc-300"
          >
            <Image
              alt={`${name} logo`}
              src={image}
              width={1600}
              height={900}
              objectFit="cover"
            />
            <h3 className="text-3xl font-extrabold text-slate-500 dark:text-zinc-500">
              {name}
            </h3>
            <p>{description}</p>
            <ul className="list-disc list-inside">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link href={link}>
              <a className="block px-4 py-2 font-semibold transition-colors rounded-md max-w-fit text-slate-900 bg-slate-200 hover:bg-opacity-70 dark:bg-zinc-700 dark:text-zinc-300">
                Visit website &rarr;
              </a>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
