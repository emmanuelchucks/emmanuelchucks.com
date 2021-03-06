import Link from "next/link";
import siteData from "../data/site";
import Navigation from "./Navigation";

const { socials } = siteData;

function Footer() {
  return (
    <footer className="pt-24 pb-12 text-center bg-slate-100 dark:bg-neutral-900">
      <Navigation label="Footer navigation" />
      <ul
        aria-label="Social media links"
        className="inline-flex my-6 space-x-2"
      >
        {socials.map(([name, url]) => (
          <li key={name}>
            <Link href={"https://" + url}>
              <a className="px-2 py-1 transition-colors rounded hover:bg-slate-200 dark:hover:bg-opacity-10">
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-sm">
        <p>Made in Accra, Ghana 🇬🇭</p>
        <small>&copy; {new Date().getFullYear()}. MIT Licence</small>
      </div>
    </footer>
  );
}

export default Footer;
