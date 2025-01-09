// Hooks
import { useContext } from "react";

// Context
import { SelectedCityContext, WeatherDataContext, WindowWidthContext, IsLoadingContext, languageContext } from "./AllContexts";

// Custom hooks
export const useCity = () => useContext(SelectedCityContext).selectedCity;
export const useSetCity = () => useContext(SelectedCityContext).setSelectedCity;

export const useWeatherData = () => useContext(WeatherDataContext).weatherData;
export const useSetWeatherData = () => useContext(WeatherDataContext).setWeatherData;

export const useLanguage = () => useContext(languageContext).language;
export const useSetLanguage = () => useContext(languageContext).setLanguage;

export const useWindowWidth = () => useContext(WindowWidthContext);

export const useIsLoading = () => useContext(IsLoadingContext).isLoading;
export const useSetIsLoading = () => useContext(IsLoadingContext).setIsLoading;
