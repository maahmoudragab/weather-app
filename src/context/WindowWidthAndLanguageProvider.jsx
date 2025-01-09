import PropTypes from "prop-types";

// Hooks
import { useEffect, useState } from "react";

// Context
import { WindowWidthContext, languageContext } from "./AllContexts";

export const WindowWidthAndLanguageProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [language, setLanguage] = useState(localStorage.getItem("language") ?? "en");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <WindowWidthContext.Provider value={ windowWidth }>
      <languageContext.Provider value={{ language, setLanguage }}>
        {children}
      </languageContext.Provider>
    </WindowWidthContext.Provider>
  );
};

WindowWidthAndLanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
