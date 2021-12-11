import type { AppProps } from "next/app";
import CanvasGradient from "../components/navbar/CanvasGradient";
import "../styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CanvasGradient />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
