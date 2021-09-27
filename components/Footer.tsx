import { Box, IconButton, Link, Stack, Text } from "@chakra-ui/react";

import Navigation from "./Navigation";
import siteData from "utils/site-data";

function Footer() {
  const { navigation, socials } = siteData;

  return (
    <Stack
      as="footer"
      align="center"
      spacing={6}
      bg="blackAlpha.50"
      pt={16}
      pb={8}
    >
      <Stack align="center" spacing={8} color="blackAlpha.700">
        <Navigation />
        <Stack as="ul" direction="row" spacing={2}>
          {socials.map(({ name, url }) => (
            <IconButton as="li" variant="link" aria-label={name} key={name}>
              <Link href={`https://${url}`} target="_blank">
                {name}
              </Link>
            </IconButton>
          ))}
        </Stack>
      </Stack>
      <Box textAlign="center" color="blackAlpha.800" fontSize="sm">
        <Text>Made with ❤️ in Accra, Ghana</Text>
        <Text as="small">Copyright 2021. MIT Licence</Text>
      </Box>
    </Stack>
  );
}

export default Footer;
