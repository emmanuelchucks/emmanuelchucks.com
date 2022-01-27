import Link from "next/link";
import projectsData from "../../data/projects";
import siteData from "../../data/site";
import Container from "../Container";
import ExternalLink from "../ExternalLink";
import Screenshot from "./Screenshot";

function Projects() {
  return (
    <section className="pt-24 pb-16 space-y-16">
      <Container as="header">
        <h2 id="projects" className="text-3xl font-bold">
          Projects
        </h2>
        <p className="mt-2 max-w-prose">
          {
            "These are commercial projects I've worked on professionally. You can find my hobby and open source projects on "
          }
          <ExternalLink
            href={"https://" + siteData.socials[1][1] + "?tab=repositories"}
            text="GitHub"
          />
          .
        </p>
      </Container>

      <Container className="grid gap-16 lg:gap-24 md:grid-cols-2 xl:max-w-6xl">
        {projectsData.map(({ name, description, images, link }) => (
          <Link key={link} href={link}>
            <a className="relative overflow-hidden transition-opacity rounded-2xl bg-slate-100 dark:bg-neutral-900 hover:opacity-80">
              <Screenshot name={name} images={images} />

              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-8 pb-10 space-y-2 bg-gradient-to-t from-slate-100 via-slate-100/95 dark:from-neutral-900 dark:via-neutral-900/95 h-[45%]">
                <h3 className="text-2xl font-bold dark:opacity-60">{name}</h3>
                <p>{description}</p>
              </div>
            </a>
          </Link>
        ))}
      </Container>
    </section>
  );
}

export default Projects;
