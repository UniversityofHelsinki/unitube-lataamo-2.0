import { useState } from "react";

const useMediaQuery = (query) => {
  const [mediaQuery, setMediaQuery] = useState(null);

  if (!mediaQuery) {
    const registeredQuery = window.matchMedia(query);
    registeredQuery.addEventListener("change", (event) => {
      setMediaQuery({ matches: event.matches });
    });
    setMediaQuery({ matches: registeredQuery.matches });
  }

  return mediaQuery;
};

export default useMediaQuery;
