import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 992) => {
  const getMatches = () =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false;

  const [isMobile, setIsMobile] = useState(getMatches);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getMatches());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
