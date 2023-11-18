"use client";

import { FC, createRef, useEffect } from "react";
import { startAnimation } from "./animate";

interface AnimatedCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  children?: React.ReactNode;
}

const AnimatedCanvas: FC<AnimatedCanvasProps> = ({ children }) => {
  const canvas = createRef<HTMLCanvasElement>();

  useEffect(() => {
    startAnimation(canvas.current!);
  }, [canvas]);

  return (
    <div className="relative w-full h-full p-28">
      <canvas
        ref={canvas}
        className="absolute inset-0 w-full h-full "
        style={{
          // Make top and bottom of canvas transparent
          WebkitMaskImage: `-webkit-linear-gradient(rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AnimatedCanvas;
