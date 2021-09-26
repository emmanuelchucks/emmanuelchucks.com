import { Button, HStack, Link } from "@chakra-ui/react";

import siteData from "utils/site-data";

function Navigation() {
  const { navigation } = siteData;

  return (
    <nav>
      <HStack as="ul" spacing="4">
        {navigation.map((navItem, idx) => (
          <Button as="li" variant="link" key={navItem}>
            <Link href={`#${idx ? navItem : ""}`} textTransform="capitalize">
              {navItem}
            </Link>
          </Button>
        ))}
      </HStack>
    </nav>
  );
}

export default Navigation;
