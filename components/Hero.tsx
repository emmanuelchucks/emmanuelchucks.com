import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";

import Image from "next/image";

// import SkillsDisplay from "./SkillsDisplay";

function Hero() {
  const hero = {
    intro: "Hello I'm Emmanuel Chucks",
    title: "Full-Stack Engineer & UI/UX Designer",
    body: {
      p1: "A passionate developer living in the crazy city of",
      a1: "Accra, Ghana",
      p2: "I love to design things, write code, and read about tech. I play the piano to help me relax and meditate.",
      p3: "I am available to collaborate and work on freelance and part-time projects.",
    },
    skills: {
      code: ["React", "GraphQL", "TypeScript", "Flutter"],
      design: ["Figma", "Canva"],
    },
  };

  return (
    <Stack
      as="section"
      direction={["column", "row"]}
      align={[null, "center"]}
      spacing={[8, null, 6, "5vw"]}
      id="home"
      mx={5}
    >
      <Box maxW="30ch">
        <Heading
          as="h1"
          color="blackAlpha.700"
          textTransform="uppercase"
          fontSize="md"
          fontWeight={600}
        >
          {hero.intro}
        </Heading>
        <Heading my={6}>{hero.title}</Heading>
        <Stack align="flex-start" spacing={4}>
          <Text>
            {hero.body.p1}{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Accra"
              target="_blank"
              rel="noreferrer"
              textDecor="underline"
              color="teal.700"
            >
              {hero.body.a1}.
            </Link>
          </Text>
          <Text>{hero.body.p2}</Text>
          <Text>{hero.body.p3}</Text>
        </Stack>
      </Box>
      <Box border="2px">
        <Image
          priority
          src="/images/hero-image.jpg"
          alt="Emmanuel and his wife"
          width={375}
          height={562}
        />
      </Box>
    </Stack>
  );
}

export default Hero;
