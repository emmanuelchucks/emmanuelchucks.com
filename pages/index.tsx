import { Container, Flex, Stack } from "@chakra-ui/react";

import Contact from "components/Contact";
import Footer from "components/Footer";
import Head from "next/head";
import Hero from "components/Hero";
import Logo from "components/Logo";
import Navigation from "components/Navigation";
import type { NextPage } from "next";
import Projects from "components/Projects";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Emmanuel Chucks - Full-Stack Engineer and UI/UX Designer</title>
      </Head>

      <Flex minH="100vh" direction="column" px={2}>
        <Stack
          as="header"
          py={8}
          direction="row"
          justify={["space-between", "space-evenly"]}
          align="baseline"
        >
          <Logo />
          <Navigation />
        </Stack>

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
