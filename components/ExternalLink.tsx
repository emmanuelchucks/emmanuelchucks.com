import Link from "next/link";

function ExternalLink({ href, text }: ExternalLinkProps) {
  return (
    <Link href={href}>
      <a className="underline transition-opacity text-slate-900 underline-offset-2 hover:opacity-80 dark:text-current dark:text-opacity-90">
        {text}
      </a>
    </Link>
  );
}

type ExternalLinkProps = {
  href: string;
  text: string;
};

export default ExternalLink;
