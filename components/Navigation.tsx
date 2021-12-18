import { Button, HStack, Link } from "@chakra-ui/react";
import siteData from "utils/site-data";

const { navigation } = siteData;

function Navigation({ id }: NavigationProps) {
  return (
    <nav id={id}>
      <HStack as="ul" spacing={4}>
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

type NavigationProps = {
  id: string;
};

export default Navigation;
