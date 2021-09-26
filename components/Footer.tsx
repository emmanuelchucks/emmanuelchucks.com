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
  const { navigation } = siteData;
  const socials = ["Twitter", "GitHub", "DEV", "Medium"];

  return (
    <VStack
      as="footer"
      spacing={8}
      bg="blackAlpha.50"
      color="blackAlpha.700"
      py={8}
    >
      <HStack align="flex-start" spacing={24}>
        <List spacing={2}>
          {navigation.map((navItem) => (
            <ListItem key={navItem}>
              <Link href={`#${navItem}`} textTransform="capitalize">
                {navItem}
              </Link>
            </ListItem>
          ))}
        </List>
        <List spacing={2}>
          {socials.map((socialSite) => (
            <ListItem key={socialSite}>
              <Link
                href={`https://${socialSite}.com/emmanuelchucks`}
                textTransform="capitalize"
              >
                {socialSite}
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
