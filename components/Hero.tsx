import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";

import Image from "next/image";

// import SkillsDisplay from "./SkillsDisplay";

function Hero() {
  const hero = {
    intro: "Hello I'm Emmanuel Chucks",
    title: "Full-Stack Engineer & UI/UX Designer",
    body: {
      p1: "A passionate developer living in the crazy city of",
      a1: "Accra, Ghana",
      p2: "I love to design things, write code, read tech blogs and take care of my family. I play the piano to help me relax and meditate.",
      p3: "I am available to collaborate and work on fun projects with others.",
    },
    skills: {
      code: ["React", "GraphQL", "TypeScript", "Flutter"],
      design: ["Figma", "Canva"],
    },
  };

  return (
    <Box as="section" id="home" mx={5} my={10}>
      <Box maxW="35ch">
        <Heading
          as="h1"
          color="blackAlpha.700"
          textTransform="uppercase"
          fontSize="md"
          fontWeight={600}
        >
          {hero.intro}
        </Heading>
        <Heading my={5}>{hero.title}</Heading>
        <VStack align="flex-start">
          <Text>
            {hero.body.p1}{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Accra"
              target="_blank"
              textDecor="underline"
              color="blue.800"
            >
              {hero.body.a1}.
            </Link>
          </Text>
          <Text>{hero.body.p2}</Text>
          <Text>{hero.body.p3}</Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Hero;
