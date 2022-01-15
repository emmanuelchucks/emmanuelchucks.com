import Image from "next/image";

function Screenshot({ name, images }: ScreenshotProps) {
  const { darkLarge, darkSmall, lightLarge, lightSmall } = images;

  return (
    <div aria-hidden>
      <div className="hidden pt-10 pl-8 dark:lg:flex">
        <Image
          alt={`${name}'s website in dark mode on desktop`}
          src={darkLarge}
          width={500}
          height={500}
          objectFit="cover"
          objectPosition="top left"
        />
      </div>
      <div className="hidden pt-10 pl-8 lg:flex dark:lg:hidden">
        <Image
          alt={`${name}'s website in light mode on desktop`}
          src={lightLarge}
          width={500}
          height={500}
          objectFit="cover"
          objectPosition="top left"
        />
      </div>
      <div className="hidden px-8 pt-10 dark:flex lg:hidden">
        <Image
          alt={`${name}'s website in dark mode on mobile`}
          src={darkSmall}
          width={500}
          height={800}
          objectFit="cover"
          objectPosition="top left"
        />
      </div>
      <div className="flex px-8 pt-10 dark:hidden lg:hidden">
        <Image
          alt={`${name}'s website in light mode on mobile`}
          src={lightSmall}
          width={500}
          height={800}
          objectFit="cover"
          objectPosition="top left"
        />
      </div>
    </div>
  );
}

type ScreenshotProps = {
  name: string;
  images: {
    darkLarge: string;
    darkSmall: string;
    lightLarge: string;
    lightSmall: string;
  };
};

export default Screenshot;
