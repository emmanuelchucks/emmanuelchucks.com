import Link from "next/link";
import siteData from "../data/siteData";

const navigation = siteData.navigation;

function Navigation({ id }: NavigationProps) {
  return (
    <nav id={id}>
      <ul className="inline-flex space-x-2">
        {navigation.map((navItem, idx) => (
          <li key={navItem}>
            <Link href={idx ? `/#${navItem}` : "/"}>
              <a className="px-2 py-1 font-semibold capitalize transition-opacity text-gray-800 hover:opacity-70">
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
  id: string;
};

export default Navigation;
