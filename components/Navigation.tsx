import Link from "next/link";
import { useRouter } from "next/router";
import siteData from "../data/siteData";

const navigation = siteData.navigation;

function Navigation({ id }: NavigationProps) {
  const router = useRouter();

  return (
    <nav id={id}>
      <ul className="inline-flex space-x-2">
        {navigation.map((navItem, idx) => {
          const href = idx ? `/#${navItem}` : "/";
          const showActive = id == "main navigation" && router.asPath === href;

          return (
            <li key={navItem}>
              <Link href={href}>
                <a
                  className={`capitalize hover:text-gray-500 font-semibold py-1 px-2 ${
                    showActive ? "underline" : ""
                  }`}
                >
                  {navItem}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type NavigationProps = {
  id: string;
};

export default Navigation;
