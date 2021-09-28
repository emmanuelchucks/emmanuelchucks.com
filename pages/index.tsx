import { Flex, Stack, Container } from "@chakra-ui/react";

import Footer from "components/Footer";
import Head from "next/head";
import Hero from "components/Hero";
import Logo from "components/Logo";
import Navigation from "components/Navigation";
import type { NextPage } from "next";
import Projects from "components/Projects";
import Contact from "components/Contact";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Emmanuel Chucks - Full-Stack Engineer and UI/UX Designer</title>
      </Head>

      <Flex minH="100vh" direction="column" px={2}>
        <Container as="header" py={8}>
          <Stack direction="row" justify="space-between" align="baseline">
            <Logo />
            <Navigation />
          </Stack>
        </Container>

        <Container as="main" py={[12, 20]} flex={1}>
          <Stack spacing={40}>
            <Hero />
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
