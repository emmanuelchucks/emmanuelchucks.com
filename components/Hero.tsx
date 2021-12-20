import Image from "next/image";
import Link from "next/link";
import heroData from "../data/heroData";
import heroImage from "../public/images/hero-image.jpg";

const { intro, title, body, skills } = heroData;

function Hero() {
  return (
    <>
      <article className="flex flex-col-reverse md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative md:max-w-sm">
          <Image src={heroImage} alt="Emmanuel and his wife" />
        </div>
        <div className="mb-8 md:max-w-sm md:mb-0">
          <div className="font-bold">
            <h1 className="text-sm text-gray-500 uppercase">{intro}</h1>
            <h2 className="my-4 text-3xl">{title}</h2>
          </div>
          <div className="space-y-3">
            <p>
              {body.paragraph1}{" "}
              <Link href="https://en.wikipedia.org/wiki/Accra">
                <a target="_blank" rel="noreferrer">
                  {body.anchor1}
                  <span className="sr-only">(open in new tab)</span>.
                </a>
              </Link>{" "}
            </p>
            <p>{body.paragraph2}</p>
            <p>{body.paragraph3}</p>
          </div>
        </div>
      </article>

      <section
        id="tech stack"
        className="flex flex-wrap justify-center gap-4 font-semibold"
      >
        {skills.map((name) => (
          <span key={name} className="px-6 py-1 rounded-full bg-zinc-100">
            {name}
          </span>
        ))}
      </section>
    </>
  );
}

export default Hero;
