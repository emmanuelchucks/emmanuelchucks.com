import { Heading, Text } from "@chakra-ui/react";

function Logo() {
  return (
    <Heading
      aria-hidden
      as="h6"
      bg="blackAlpha.900"
      color="white"
      px={2}
      fontSize="3xl"
    >
      <Text as="span" display={["inline", "none"]}>
        e.
      </Text>
      <Text as="span" display={["none", "inline"]}>
        emmanuel.
      </Text>
    </Heading>
  );
}

export default Logo;
