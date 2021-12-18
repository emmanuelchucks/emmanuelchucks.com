import { HStack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  SiCanva,
  SiFigma,
  SiFlutter,
  SiKotlin,
  SiReact,
  SiSwift,
} from "react-icons/si";
import heroData from "utils/hero-data";

const { skills } = heroData;
const techIcons = [SiReact, SiFlutter, SiSwift, SiKotlin, SiFigma, SiCanva];

function TechStack() {
  return (
    <HStack
      as="section"
      id="tech-stack"
      gridGap={4}
      spacing={0}
      wrap="wrap"
      justify="center"
    >
      {skills.map((name, idx) => (
        <Tag key={name} size="lg" borderRadius="full" variant="outline">
          <TagLeftIcon as={techIcons[idx]} />
          <TagLabel>{name}</TagLabel>
        </Tag>
      ))}
    </HStack>
  );
}

export default TechStack;
