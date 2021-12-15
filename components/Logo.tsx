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
      e
      <Text as="span" display={["none", "inline"]}>
        mmanuel
      </Text>
      .
    </Heading>
  );
}

export default Logo;
