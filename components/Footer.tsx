import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaDev, FaGithub, FaMediumM, FaTwitter } from "react-icons/fa";

import Navigation from "./Navigation";
import siteData from "utils/site-data";

function Footer() {
  const { socials } = siteData;
  const socialIcons = [FaTwitter, FaGithub, FaDev, FaMediumM];

  return (
    <Stack as="footer" align="center" spacing={6} bg="gray.50" pt={16} pb={8}>
      <Stack align="center" spacing={8} color="blackAlpha.700">
        <Navigation />
        <Stack as="ul" direction="row" spacing={2} listStyleType="none">
          {socials.map(({ name, url }, idx) => {
            const Icon = socialIcons[idx];
            return (
              <Box as="li" key={name}>
                <IconButton
                  as="a"
                  icon={<Icon />}
                  aria-label={name}
                  variant="ghost"
                  colorScheme="blackAlpha"
                  size="lg"
                  color="black"
                  href={`https://${url}`}
                  target="_blank"
                ></IconButton>
              </Box>
            );
          })}
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
