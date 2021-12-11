import Script from "next/script";
import { FunctionComponent } from "react";
const CanvasGradient: FunctionComponent = () => {
  return (
    <>
      <canvas id="gradient-canvas"></canvas>
      <Script src="/Gradient.js" strategy="beforeInteractive" />
      <Script
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var gradient = new Gradient();
            gradient.initGradient('#gradient-canvas');
          `,
        }}
      />
    </>
  );
};

export default CanvasGradient;
