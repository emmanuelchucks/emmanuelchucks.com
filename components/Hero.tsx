import Image from "next/image";
import Link from "next/link";
import {
  SiAwsamplify,
  SiCanva,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiReact,
} from "react-icons/si";
import heroData from "../data/heroData";

const { intro, title, body, skills } = heroData;
const [paragraph1, anchor1, paragraph2, paragraph3] = body;

const Icons = [SiReact, SiFlutter, SiAwsamplify, SiFirebase, SiFigma, SiCanva];

function Hero() {
  return (
    <div className="container px-4 mx-auto space-y-24 lg:max-w-4xl">
      <article className="flex flex-col-reverse md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative flex md:max-w-xs lg:max-w-sm">
          <Image
            priority
            src="/images/hero-image.jpg"
            alt="Emmanuel and his wife"
            width={600}
            height={900}
          />
        </div>
        <div className="mb-8 md:max-w-sm md:mb-0">
          <div className="font-bold">
            <h1 className="text-sm uppercase opacity-50">{intro}</h1>
            <h2 className="my-4 text-3xl">{title}</h2>
          </div>
          <div className="space-y-3">
            <p>
              {paragraph1}{" "}
              <Link href="https://en.wikipedia.org/wiki/Accra">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline transition-opacity underline-offset-2 text-gray-900 hover:opacity-80"
                >
                  {anchor1}
                  <span className="sr-only">(open in new tab)</span>
                </a>
              </Link>
              .
            </p>
            <p>{paragraph2}</p>
            <p>{paragraph3}</p>
          </div>
        </div>
      </article>

      <section
        id="tech stack"
        className="flex flex-wrap justify-center gap-4 font-semibold"
      >
        {skills.map((name, idx) => {
          const Icon = Icons[idx];

          return (
            <span
              key={name}
              className="flex items-center gap-2 px-6 py-1 rounded-full opacity-70 bg-gray-100"
            >
              <Icon />
              {name}
            </span>
          );
        })}
      </section>
    </div>
  );
}

export default Hero;
