import { Button, HStack, Link } from "@chakra-ui/react";

import siteData from "utils/site-data";

type NavigationProps = {
  id: string;
};

function Navigation({ id }: NavigationProps) {
  const { navigation } = siteData;

  return (
    <nav id={id}>
      <HStack as="ul" spacing={6}>
        {navigation.map((navItem, idx) => (
          <Button as="li" variant="link" key={navItem}>
            <Link
              href={`#${idx ? navItem.toLowerCase() : ""}`}
              textTransform="capitalize"
            >
              {navItem}
            </Link>
          </Button>
        ))}
      </HStack>
    </nav>
  );
}

export default Navigation;
