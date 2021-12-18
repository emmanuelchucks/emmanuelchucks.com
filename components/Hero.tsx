import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import heroImage from "public/images/hero-image.jpg";
import heroData from "utils/hero-data";

const { intro, title, body } = heroData;

function Hero() {
  return (
    <Stack
      as="section"
      direction={["column", "column", "row"]}
      align={[null, null, "center"]}
      justify="space-between"
      spacing={[8, null]}
      id="hero"
    >
      <Box maxW={[null, null, "28ch"]}>
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
      <Stack pos="relative" maxW={[null, null, 360]}>
        <Image alt="Emmanuel and his wife" src={heroImage} />
      </Stack>
    </Stack>
  );
}

export default Hero;
