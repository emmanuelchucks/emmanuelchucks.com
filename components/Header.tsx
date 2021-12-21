import Navigation from "./Navigation";

function Header() {
  return (
    <header className="container p-4 mx-auto lg:max-w-5xl">
      <div className="flex items-baseline justify-between mt-2 md:mt-4">
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
