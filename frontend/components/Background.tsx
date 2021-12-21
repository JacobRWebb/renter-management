import { FunctionComponent, useEffect, useRef } from "react";
import * as Gradient from "../util/Gradient";

const Background: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const gradient = new Gradient.Gradient();
    if (canvasRef.current) {
      gradient.el = canvasRef.current;
      gradient.connect();
    }

    return () => {
      gradient.disconnect();
    };
  }, []);

  return <canvas id="gradient-canvas" ref={canvasRef}></canvas>;
};

export default Background;
