import { Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import Head from "next/head";
import Logo from "components/Logo";
import Navigation from "components/Navigation";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Emmanuel Chucks - Full-Stack Engineer and UI/UX Designer</title>
      </Head>

      <Flex minH="100vh" direction="column">
        <HStack
          as="header"
          justify={["space-between", "space-around"]}
          align="baseline"
          px={8}
          py={5}
        >
          <Logo />
          <Navigation />
        </HStack>

        <VStack as="main" flex={1} justify="center">
          <Heading>Hello from Chakra UI</Heading>
        </VStack>

        <VStack as="footer" spacing={0} bg="blackAlpha.100" py={8}>
          <Text>Made with ❤️ in Accra, Ghana</Text>
          <Text as="small">Copyright 2021. MIT Licence</Text>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
