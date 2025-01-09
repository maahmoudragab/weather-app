import PropTypes from "prop-types";

// Hooks
import { useState } from "react";

// Context
import { SelectedCityContext } from "./AllContexts";

export const SelectedCityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(JSON.parse(localStorage.getItem("city")) ?? { name: "Cairo", key: 127164 });

  return (
    <SelectedCityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </SelectedCityContext.Provider>
  );
};

SelectedCityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
