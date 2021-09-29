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
    <HStack wrap="wrap" justify="center">
      {skills.map(({ name, color }, idx) => (
        <Tag size="lg" borderRadius="full" colorScheme="blackAlpha">
          <TagLeftIcon as={techIcons[idx]} />
          <TagLabel>{name}</TagLabel>
        </Tag>
      ))}
    </HStack>
  );
}

export default TechStack;
