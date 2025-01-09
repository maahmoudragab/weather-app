// Create Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Context Providers
import { SelectedCityProvider } from "./context/SelectedCityProvider";
import { WeatherDataProvider } from "./context/WeatherDataProvider";
import { WindowWidthAndLanguageProvider } from "./context/WindowWidthAndLanguageProvider";

// Custom Components
import MyContainer from "./components/Container";

const theme = createTheme({ typography: { fontFamily: "Alexandria" } });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SelectedCityProvider>
        <WindowWidthAndLanguageProvider>
          <WeatherDataProvider>
            <MyContainer />
          </WeatherDataProvider>
        </WindowWidthAndLanguageProvider>
      </SelectedCityProvider>
    </ThemeProvider>
  );
}

export default App;
