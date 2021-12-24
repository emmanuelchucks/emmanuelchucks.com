import Navigation from "./Navigation";

function Header() {
  return (
    <header className="container mx-auto lg:max-w-4xl xl:max-w-5xl">
      <div className="flex items-baseline justify-between px-4 mt-4 md:mt-8">
        <h6
          aria-hidden
          className="px-4 py-2 text-3xl font-semibold text-white bg-black max-w-min"
        >
          e<span className="hidden sm:inline">mmanuel</span>.
        </h6>
        <Navigation id="main navigation" />
      </div>
    </header>
  );
}

export default Header;
