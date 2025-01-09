// MUI Components
import { Container, Stack } from "@mui/material";

// Custom Components
import Navbar from "./Navbar";
import HoursForecast from "./HoursForecast";
import CurrentWeather from "./CurrentWeather";
import DaysForecast from "./DaysForecast";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

// Custom Hooks
import { useWindowWidth, useIsLoading } from "../context/CustomHooks";

export default function MyContainer() {
  const isLoading = useIsLoading();
  const windowWidth = useWindowWidth();

  return (
    <Container maxWidth="100%" sx={{ p: 1, px: windowWidth < 600 ? 1 : 2 }}>
      {isLoading === true? (
        <>
          <Navbar />
          <Loading />
        </>
      ) : isLoading === "error" ? (
        <ErrorMessage />
      ) : (
        <Stack gap="20px">
          <Navbar />
          <CurrentWeather />
          <HoursForecast />
          <DaysForecast />
        </Stack>
      )}
    </Container>
  );
}
