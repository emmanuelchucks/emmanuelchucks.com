import Container from "./Container";
import Navigation from "./Navigation";

function Header() {
  return (
    <Container
      as="header"
      className="flex items-baseline justify-between w-full py-0 mt-6 md:mt-8 xl:max-w-5xl"
    >
      <p
        aria-hidden
        className="px-4 py-2 text-3xl font-semibold text-white bg-black max-w-min"
      >
        e<span className="hidden sm:inline">mmanuel</span>.
      </p>
      <Navigation label="Main navigation" />
    </Container>
  );
}

export default Header;
