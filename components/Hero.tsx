import Image from "next/image";
import {
  SiAwsamplify,
  SiCanva,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiReact,
} from "react-icons/si";
import heroData from "../data/hero";
import Container from "./Container";
import ExternalLink from "./ExternalLink";

const { intro, title, body, skills } = heroData;
const [paragraph1, anchor1, paragraph2, paragraph3] = body;

const Icons = [SiReact, SiFlutter, SiAwsamplify, SiFirebase, SiFigma, SiCanva];

function Hero() {
  return (
    <Container as="article" className="space-y-24 py-14">
      <div className="flex flex-col-reverse md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative flex justify-center shadow-xl">
          <Image
            priority
            src="/images/hero-image.jpg"
            alt="Emmanuel and his wife"
            width={400}
            height={600}
          />
        </div>

        <div className="mb-10 md:max-w-sm md:mb-0 md:pr-10 lg:pr-0">
          <h1 className="text-sm font-bold uppercase opacity-60">{intro}</h1>
          <h2 className="my-4 text-3xl font-bold">{title}</h2>
          <div className="space-y-3">
            <p>
              {paragraph1}{" "}
              <ExternalLink
                href="https://en.wikipedia.org/wiki/Accra"
                text={anchor1}
              />
              .
            </p>
            <p>{paragraph2}</p>
            <p>{paragraph3}</p>
          </div>
        </div>
      </div>

      <section aria-label="Tech stack">
        <ul className="flex flex-wrap justify-center gap-4 font-semibold">
          {skills.map((name, idx) => {
            const Icon = Icons[idx];

            return (
              <li
                key={name}
                className="flex items-center gap-2 px-6 py-1 rounded-full bg-slate-100 opacity-70 dark:bg-opacity-5"
              >
                <Icon aria-hidden />
                {name}
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}

export default Hero;
