import { Flex, Stack } from "@chakra-ui/react";

import Footer from "components/Footer";
import Head from "next/head";
import Hero from "components/Hero";
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
        <Stack
          direction="row"
          as="header"
          justify={["space-between", "space-around"]}
          align="baseline"
          px={5}
          py={8}
        >
          <Logo />
          <Navigation />
        </Stack>

        <Stack as="main" flex={1} justify="center" align="center" py={[12, 20]}>
          <Hero />
        </Stack>

        <Footer />
      </Flex>
    </>
  );
};

export default Home;
