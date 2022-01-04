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
import heroData from "../data/hero";

const { intro, title, body, skills } = heroData;
const [paragraph1, anchor1, paragraph2, paragraph3] = body;

const Icons = [SiReact, SiFlutter, SiAwsamplify, SiFirebase, SiFigma, SiCanva];

function Hero() {
  return (
    <section className="container px-4 mx-auto space-y-24 lg:max-w-4xl">
      <article className="flex flex-col-reverse md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative flex justify-center shadow-2xl md:max-w-xs lg:max-w-sm">
          <Image
            priority
            src="/images/hero-image.jpg"
            alt="Emmanuel and his wife"
            width={400}
            height={600}
          />
        </div>
        <div className="mb-8 md:max-w-sm md:mb-0">
          <h1 className="text-sm font-bold uppercase opacity-50">{intro}</h1>
          <h2 className="my-4 text-3xl font-bold">{title}</h2>
          <div className="space-y-3">
            <p>
              {paragraph1}{" "}
              <Link href="https://en.wikipedia.org/wiki/Accra">
                <a className="underline transition-opacity text-slate-900 underline-offset-2 hover:opacity-80">
                  {anchor1}
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
              className="flex items-center gap-2 px-6 py-1 rounded-full bg-slate-100 opacity-70"
            >
              <Icon />
              {name}
            </span>
          );
        })}
      </section>
    </section>
  );
}

export default Hero;
