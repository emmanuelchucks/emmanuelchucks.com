import { Container, Flex, Stack } from "@chakra-ui/react";

import Contact from "components/Contact";
import Footer from "components/Footer";
import Head from "next/head";
import Hero from "components/Hero";
import Logo from "components/Logo";
import Navigation from "components/Navigation";
import type { NextPage } from "next";
import Projects from "components/Projects";
import TechStack from "components/TechStack";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Emmanuel Chucks - Full-Stack Engineer and UI/UX Designer</title>
      </Head>

      <Flex minH="100vh" direction="column">
        <Container
          as="header"
          maxW={[null, null, "60ch", "80ch"]}
          px={5}
          py={8}
        >
          <Stack direction="row" justify="space-between" align="baseline">
            <Logo />
            <Navigation id="main-navigation" />
          </Stack>
        </Container>

        <Container
          as="main"
          maxW={[null, null, "60ch", "70ch"]}
          px={5}
          py={16}
          flex={1}
        >
          <Stack spacing={24}>
            <Stack spacing={24}>
              <Hero />
              <TechStack />
            </Stack>
            <Projects />
            <Contact />
          </Stack>
        </Container>

        <Footer />
      </Flex>
    </>
  );
};

export default Home;
