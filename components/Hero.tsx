import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";

import heroData from "utils/hero-data";
import ChakraNextImage from "./ChakraNextImage";

function Hero() {
  const { intro, title, body } = heroData;

  return (
    <Stack
      as="section"
      direction={["column", "row"]}
      align={[null, "center"]}
      spacing={[8, "5vw"]}
      id="hero"
    >
      <Box maxW={[null, "28ch"]}>
        <Heading
          as="h1"
          color="blackAlpha.700"
          textTransform="uppercase"
          fontSize="md"
          fontWeight={600}
        >
          {intro}
        </Heading>
        <Heading my={6}>{title}</Heading>
        <Stack align="flex-start" spacing={4}>
          <Text>
            {body.p1}{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Accra"
              target="_blank"
              rel="noreferrer"
              textDecor="underline"
              color="blackAlpha.800"
            >
              {body.a1}.
            </Link>
          </Text>
          <Text>{body.p2}</Text>
          <Text>{body.p3}</Text>
        </Stack>
      </Box>
      <ChakraNextImage
        shadow="2xl"
        pb={0}
        priority
        src="/images/hero-image.jpg"
        alt="Emmanuel and his wife"
        width={375}
        height={562}
      />
    </Stack>
  );
}

export default Hero;
