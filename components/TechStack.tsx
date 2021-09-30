import { HStack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  SiCanva,
  SiFigma,
  SiFlutter,
  SiGraphql,
  SiReact,
  SiTypescript,
} from "react-icons/si";

import heroData from "utils/hero-data";

function TechStack() {
  const { skills } = heroData;
  const techIcons = [
    SiReact,
    SiGraphql,
    SiTypescript,
    SiFlutter,
    SiFigma,
    SiCanva,
  ];

  return (
    <HStack
      as="section"
      id="tech-stack"
      gridGap={2}
      spacing={0}
      wrap="wrap"
      justify="center"
    >
      {skills.map(({ name }, idx) => (
        <Tag
          key={name}
          size="lg"
          borderRadius="full"
          color="blackAlpha.700"
          colorScheme="blackAlpha"
          shadow="base"
          _groupHover={{
            colorScheme: "linkedin",
          }}
        >
          <TagLeftIcon as={techIcons[idx]} />
          <TagLabel>{name}</TagLabel>
        </Tag>
      ))}
    </HStack>
  );
}

export default TechStack;
