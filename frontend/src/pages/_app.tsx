import { Background } from "@/components";
import { wrapper } from "@/store";
import "@/styles/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";
import Head from "next/head";

library.add(fas);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Background />
      <Head>
        <title>Welcome to Xodius</title>
        <meta name="theme-color" content="#379683" />
        <meta
          name="description"
          content="User friendly portal for managing everything renters"
        />
      </Head>
      <div className="h-screen appearance-none">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
