import { Button, HStack, Link } from "@chakra-ui/react";

function Navigation() {
  const navItems = ["projects", "contact"];

  return (
    <nav>
      <HStack as="ul" spacing="4">
        {navItems.map((navItem) => (
          <Button as="li" variant="link" key={navItem}>
            <Link href={`#${navItem}`} textTransform="capitalize">
              {navItem}
            </Link>
          </Button>
        ))}
      </HStack>
    </nav>
  );
}

export default Navigation;
