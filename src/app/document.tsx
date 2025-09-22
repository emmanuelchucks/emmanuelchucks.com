import type { PropsWithChildren } from "react";
import stylesUrl from "./styles.css?url";

export function Document({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <html lang="en" className="scheme-light-dark [scrollbar-gutter:stable]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Emmanuel Chucks</title>
        <link rel="modulepreload" href="/src/client.tsx" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href={stylesUrl} />
      </head>
      <body
        className={`overflow-x-hidden bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50`}
      >
        <div id="root">{children}</div>
        <script>import("/src/client.tsx")</script>
      </body>
    </html>
  );
}
