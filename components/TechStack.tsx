import { HStack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  SiCanva,
  SiFigma,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiReact,
} from "react-icons/si";

import heroData from "utils/hero-data";

function TechStack() {
  const { skills } = heroData;
  const techIcons = [SiReact, SiFlutter, SiSwift, SiKotlin, SiFigma, SiCanva];

  return (
    <HStack
      as="section"
      id="tech-stack"
      gridGap={2}
      spacing={0}
      wrap="wrap"
      justify="center"
    >
      {skills.map(({ name, color }, idx) => (
        <Tag
          key={name}
          size="lg"
          borderRadius="full"
          transition="all 0.2s ease"
          bg="white"
          _hover={{ color: color, shadow: "base" }}
        >
          <TagLeftIcon as={techIcons[idx]} />
          <TagLabel>{name}</TagLabel>
        </Tag>
      ))}
    </HStack>
  );
}

export default TechStack;
