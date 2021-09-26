import { Button, HStack, Text } from "@chakra-ui/react";

function Navigation() {
  const navItems = ["projects", "contact"];

  return (
    <nav>
      <HStack as="ul" spacing="4">
        {navItems.map((navItem) => (
          <Button as="li" variant="link" key={navItem}>
            <Text as="a" href={`#${navItem}`} textTransform="capitalize">
              {navItem}
            </Text>
          </Button>
        ))}
      </HStack>
    </nav>
  );
}

export default Navigation;
