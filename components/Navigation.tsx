import Link from "next/link";
import siteData from "../data/site";

const navigation = siteData.navigation;

function Navigation({ label }: NavigationProps) {
  return (
    <nav aria-label={label}>
      <ul className="inline-flex space-x-2">
        {navigation.map((navItem, idx) => (
          <li key={navItem}>
            <Link href={idx ? `/#${navItem}` : "/"}>
              <a className="px-2 py-1 font-semibold capitalize transition-opacity text-slate-800 hover:text-opacity-80">
                {navItem}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type NavigationProps = {
  label: string;
};

export default Navigation;
