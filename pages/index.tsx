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
        <header className="mx-4 md:container md:mx-auto">
          <Header />
        </header>

        <main className="mx-4 space-y-16 md:container md:mx-auto">
          <Hero />
          <Projects />
          <Contact />
        </main>

        <footer className="py-16 text-center bg-slate-100">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
