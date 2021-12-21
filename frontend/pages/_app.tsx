import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";
import Head from "next/head";
import Background from "../components/Background";
import { Navbar } from "../components/navbar";
import { wrapper } from "../store/";
import "../styles/index.scss";

library.add(fas);

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="page">
      <Head>
        <title>Welcome to Xodius</title>
        <meta name="theme-color" content="#379683" />
        <meta
          name="description"
          content="User friendly portal for managing everything renters"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Background />
    </div>
  );
}

export default wrapper.withRedux(App);
