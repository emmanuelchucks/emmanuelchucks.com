import type { NextPage } from "next";
import Head from "next/head";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Emmanuel Chucks - Full-Stack Engineer and UI/UX Designer</title>
      </Head>

      <div className="flex flex-col justify-between min-h-screen space-y-16">
        <Header />

        <main className="space-y-24">
          <Hero />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
