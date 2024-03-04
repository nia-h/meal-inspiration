import React from "react";
import Loader from "/components/Loader";
import { useRouter } from "next/router";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo: Repo = await res.json();
//   // Pass data to the page via props
//   return { props: { repo } };
// }) satisfies GetServerSideProps<{ repo: Repo }>; //repo here is a type property

type Me = { locale: string | undefined; rating: number };

export const getServerSideProps = (async (context) => {
  return {
    props: { nia: { locale: context.locale, rating: Math.random() } },
  };
}) satisfies GetServerSideProps<{ nia: Me }>;

export interface MyPageData {
  //this is the name given to props in the following block
  locale: string | undefined;
  rating: number;
}

// export const getServerSideProps: GetServerSideProps<MyPageData> = async (context) => ({
//   // the first and only parameter default to context, but can be ommited
//   props: {
//     locale: context.locale,
//     rating: Math.random(),
//   },
// });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return <>{loading ? <Loader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
