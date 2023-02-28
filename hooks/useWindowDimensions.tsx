"use client";

import { useLayoutEffect, useState } from "react";

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};

export default function useWindowDimensions(): WindowDimentions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
