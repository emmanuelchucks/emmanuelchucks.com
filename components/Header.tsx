import Navigation from "./Navigation";

function Header() {
  return (
    <div className="flex items-baseline justify-between mt-4">
      <h6
        aria-hidden
        className="px-4 py-2 text-3xl font-semibold text-white bg-black max-w-min"
      >
        e<span className="hidden sm:inline">mmanuel</span>.
      </h6>
      <Navigation id="main navigation" />
    </div>
  );
}

export default Header;
