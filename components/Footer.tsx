import Link from "next/link";
import siteData from "../data/siteData";
import Navigation from "./Navigation";

const { socials } = siteData;

function Footer() {
  return (
    <>
      <Navigation id="footer navigation" />
      <ul className="inline-flex my-6 space-x-4">
        {socials.map(({ name, url }) => (
          <li key={name}>
            <Link href={`https://${url}`}>
              <a target="_blank" rel="noreferrer">
                {name}
                <span className="sr-only">(open in new tab)</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <p>Made in Accra, Ghana 🇬🇭</p>
      <small>&copy; {new Date().getFullYear()}. MIT Licence</small>
    </>
  );
}

export default Footer;
