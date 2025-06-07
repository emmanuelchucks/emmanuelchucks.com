import clsx from "clsx";
import styles from "./style.css?url";

export function Document({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="scheme-light-dark [scrollbar-gutter:stable]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="modulepreload" href="/src/client.tsx" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href={styles} />
      </head>
      <body
        className={clsx(
          "overflow-x-hidden",
          "text-neutral-950 dark:text-neutral-50",
          "bg-neutral-50 dark:bg-neutral-950",
        )}
      >
        <div id="root">{children}</div>
        <script>import("/src/client.tsx")</script>
      </body>
    </html>
  );
}
