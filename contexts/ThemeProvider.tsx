"use client";

import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
} from "react";

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
};

interface ContextProps {
  windowDimensions: MutableRefObject<WindowDimensions>;
}

const ThemeContext = createContext<ContextProps>({
  windowDimensions: {
    current: {
      width: undefined,
      height: undefined,
    },
  },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const windowDimensions = useRef<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize(): void {
      windowDimensions.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ThemeContext.Provider value={{ windowDimensions }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useThemeContext };
