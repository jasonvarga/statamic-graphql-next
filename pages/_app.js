import "tailwindcss/tailwind.css";
import Link from "next/link";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Statamic 3 Next.js</title>
      </Head>
      <div className="container max-w-xl mx-auto pt-8">
        <div className="pb-4 mb-8 border-b-4">
          <h1 className="text-5xl font-bold mb-4">
            <Link href="/">Statamic 3 Next.js</Link>
          </h1>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
