import {
  Box,
  HStack,
  Link,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";

import siteData from "utils/site-data";

function Footer() {
  const { navigation, socials } = siteData;

  return (
    <VStack as="footer" spacing={8} bg="blackAlpha.50" pt={16} pb={8}>
      <HStack align="flex-start" color="blackAlpha.700">
        <List spacing={2}>
          {navigation.map((navItem, idx) => (
            <ListItem key={navItem}>
              <Link href={`#${idx ? navItem : ""}`} textTransform="capitalize">
                {navItem}
              </Link>
            </ListItem>
          ))}
        </List>
        <List spacing={2}>
          {socials.map(({ name, url }) => (
            <ListItem key={name}>
              <Link
                href={`https://${url}`}
                target="_blank"
                textTransform="capitalize"
              >
                {name}
              </Link>
            </ListItem>
          ))}
        </List>
      </HStack>
      <Box textAlign="center" color="blackAlpha.800">
        <Text>Made with ❤️ in Accra, Ghana</Text>
        <Text as="small">Copyright 2021. MIT Licence</Text>
      </Box>
    </VStack>
  );
}

export default Footer;
