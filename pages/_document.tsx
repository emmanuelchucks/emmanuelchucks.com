import Document, { Head, Html, Main, NextScript } from "next/document";
import siteData from "../data/siteData";

const { title, meta, theme } = siteData;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth scroll-p-8 md:scroll-p-16">
        <Head>
          <meta name="theme-color" content={theme} />
          <meta name="description" content={meta.description} />

          {/* Google / Search Engine Tags */}
          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={meta.description} />
          <meta itemProp="image" content={meta.image} />

          {/* Facebook Meta Tags */}
          <meta property="og:url" content="https://www.emmanuelchucks.com" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content={meta.image} />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />

          {/* Favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
