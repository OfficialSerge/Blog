import { useState, useEffect } from "react";

// use this to wait until the initial DOM
// render to THEN instrument any stateful
// changes see below link
//
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export default function useHasMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
