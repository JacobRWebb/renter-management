import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";
import Head from "next/head";
import CanvasGradient from "../components/CanvasGradient";
import { wrapper } from "../store/";
import "../styles/index.scss";

library.add(fas);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome Renter</title>
      </Head>
      <CanvasGradient />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
