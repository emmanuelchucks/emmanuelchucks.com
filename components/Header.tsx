import Navigation from "./Navigation";

function Header() {
  return (
    <header className="container flex items-baseline justify-between w-full px-4 mx-auto mt-4 md:mt-8 lg:max-w-4xl xl:max-w-5xl">
      <h6
        aria-hidden
        className="px-4 py-2 text-3xl font-semibold text-white bg-black max-w-min"
      >
        e<span className="hidden sm:inline">mmanuel</span>.
      </h6>
      <Navigation label="Main navigation" />
    </header>
  );
}

export default Header;
