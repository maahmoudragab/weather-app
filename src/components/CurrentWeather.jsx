// MUI Components
import { Stack, Typography } from "@mui/material";

// i18next
import { useTranslation } from "react-i18next";

// Hooks
import { useEffect } from "react";

// Use Custom Hooks
import { useWeatherData, useWindowWidth, useLanguage } from "../context/CustomHooks";

export default function CurrentWeather() {
  const { t, i18n } = useTranslation();
  const language = useLanguage();
  const windowWidth = useWindowWidth();
  const weatherData = useWeatherData().currentWeather;

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const getDate = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    const [hourMinute, period] = time.split(" ");
    const translatedPeriod = t(period.toUpperCase());
    return `${date} ${hourMinute} ${translatedPeriod}`;
  };


  return (
    <Stack
      dir={language === "en" ? "ltr" : "rtl"}
      sx={{
        flexDirection: windowWidth > 992 ? "row" : "column",
        justifyContent: "space-between",
        gap: windowWidth > 992 ? "40px" : "20px",
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent={windowWidth > 992 ? "start" : "center"}
        flexGrow="3"
        gap="20px"
      >
        <img
          src={`/weather-icons/${weatherData.icon}`}
          alt="icon"
          rel="preload"
          style={{
            maxWidth: windowWidth > 992 ? "200px" : "130px",
            minWidth: "80px",
          }}
        />

        <Typography
          sx={{
            color: "#fff",
            fontSize: `clamp(80px, 35vw, 200px)`,
            fontWeight: "300",
            lineHeight: "1",
            padding: language === "en" ? "0 18px 0 0" : "0 0 0 18px",
            position: "relative",
            "&::before": {
              content: `''`,
              position: "absolute",
              top: 15,
              right: language === "en" ? "0" : "100%",
              width: 15,
              height: 15,
              bgcolor: "transparent",
              border: "3px solid",
              borderRadius: "50%",
            },
          }}
        >
          {weatherData.temperature}
        </Typography>
      </Stack>
      <Stack
        justifyContent="space-bettween"
        flexGrow="1"
        gap="10px"
        sx={{ bgcolor: "#c7deff2e", p: 2, borderRadius: 5 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "400",
              fontSize: windowWidth > 992 ? "2rem" : "1.2rem",
            }}
          >
            {t(weatherData.description)}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#ddd",
              fontWeight: "300",
              fontSize: windowWidth > 992 ? "1.2rem" : ".8rem",
            }}
          >
            {getDate()}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          gap={windowWidth < 992 ? 1 : 3}
          flexWrap={"wrap"}
          justifyContent={windowWidth > 600 ? "space-around" : "space-between"}
          alignItems={"center"}
          sx={{ "*": { fontWeight: 300 } }}
        >
          <Stack
            gap={0.5}
            alignItems="center"
            flexDirection={windowWidth < 992 ? "row" : "column"}
          >
            <img
              src="/weather-icons/humidity.svg"
              alt="icon"
              style={{
                width:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
                height:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize:
                  windowWidth > 992
                    ? "1.2rem"
                    : windowWidth > 600
                    ? "1rem"
                    : ".6rem",
              }}
            >
              {t("Humidity")}: {weatherData.humidity}%
            </Typography>
          </Stack>

          <Stack
            gap={0.5}
            alignItems="center"
            flexDirection={windowWidth < 992 ? "row" : "column"}
          >
            <img
              src="/weather-icons/wind.svg"
              alt="icon"
              style={{
                width:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
                height:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize:
                  windowWidth > 992
                    ? "1.2rem"
                    : windowWidth > 600
                    ? "1rem"
                    : ".6rem",
              }}
            >
              {t("Wind")}: {weatherData.wind} {t("m/s")}
            </Typography>
          </Stack>

          <Stack
            gap={0.5}
            alignItems="center"
            flexDirection={windowWidth < 992 ? "row" : "column"}
          >
            <img
              src="/weather-icons/min-max.svg"
              alt="icon"
              style={{
                width:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
                height:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize:
                  windowWidth > 992
                    ? "1.2rem"
                    : windowWidth > 600
                    ? "1rem"
                    : ".6rem",
                position: "relative",
                padding: language === "en" ? "0 7px 0 0" : "0 0 0 3px",
                "&::before": {
                  content: `''`,
                  position: "absolute",
                  top: 2,
                  right: language === "en" ? "0" : "100%",
                  width: 5,
                  height: 5,
                  bgcolor: "transparent",
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                },
              }}
            >
              {t("Min")} : {weatherData.min}
            </Typography>
          </Stack>

          <Stack
            gap={0.5}
            alignItems="center"
            flexDirection={windowWidth < 992 ? "row" : "column"}
          >
            <img
              src="/weather-icons/min-max.svg"
              alt="icon"
              style={{
                width:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
                height:
                  windowWidth > 992
                    ? "80px"
                    : windowWidth > 600
                    ? "25px"
                    : "15px",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize:
                  windowWidth > 992
                    ? "1.2rem"
                    : windowWidth > 600
                    ? "1rem"
                    : ".6rem",
                position: "relative",
                padding: language === "en" ? "0 7px 0 0" : "0 0 0 3px",
                "&::before": {
                  content: `''`,
                  position: "absolute",
                  top: 2,
                  right: language === "en" ? "0" : "100%",
                  width: 5,
                  height: 5,
                  bgcolor: "transparent",
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                },
              }}
            >
              {t("Max")}: {weatherData.max}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
