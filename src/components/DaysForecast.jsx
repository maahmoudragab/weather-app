// MUI Components
import { Stack, Typography, Divider, Box } from "@mui/material";

// Swiper Components & Styles
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// i18n
import { useTranslation } from "react-i18next";

// React Hooks
import { useEffect } from "react";

// Custom Hooks
import { useWeatherData, useWindowWidth, useLanguage } from "../context/CustomHooks";

export default function DaysForecast() {
  const { t, i18n } = useTranslation();
  const language = useLanguage();
  const windowWidth = useWindowWidth();
  const weatherData = useWeatherData().dailyForecast;

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const dayJSX = weatherData.map((day, index) => (
    <SwiperSlide key={index}
      style={{
        width: windowWidth > 992 ? "calc((1836px / 5) - 9px)" : "240px",
      }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="stretch"
        flexDirection="row"
        gap={1}
        sx={{
          height: "100%",
          bgcolor: "#00000024",
          borderRadius: 5,
          justifyContent: "space-between",
          p: 2,
          opacity: day.isToday ? "1" : "0.5",
        }}
      >
        <Stack
          flexGrow={1}
          justifyContent="space-between"
          sx={{
            "*": {
              color: "#fff",
              fontWeight: "300",
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: windowWidth > 992 ? "1.5rem" : "1rem",
              }}
            >
              {`${t(day.day.text)} ${day.day.number}`}
            </Typography>
            <Divider sx={{ width: "100%", mb: 1 }} />
          </Box>

          <Typography
            sx={{
              fontSize: windowWidth > 992 ? "1rem" : ".8rem",
              position: "relative",
              width: "fit-content",
              fontWeight: 300,
              padding: language === "en" ? "0 7px 0 0" : "0 0 0 7px",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 2,
                right: language === "en" ? "0" : "94%",
                width: 5,
                height: 5,
                bgcolor: "transparent",
                border: "1px solid #ddd",
                borderRadius: "50%",
              },
            }}
          >
            {t("Min")}: {day.temperature.min}
          </Typography>
          <Typography
            sx={{
              fontSize: windowWidth > 992 ? "1rem" : ".8rem",
              position: "relative",
              width: "fit-content",
              fontWeight: 300,
              padding: language === "en" ? "0 7px 0 0" : "0",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 2,
                right: language === "en" ? "0" : "102%",
                width: 5,
                height: 5,
                bgcolor: "transparent",
                border: "1px solid #ddd",
                borderRadius: "50%",
              },
            }}
          >
            {t("Max")}: {day.temperature.max}
          </Typography>

          <Typography
            sx={{
              fontSize: windowWidth > 992 ? "1rem" : ".8rem",
              fontWeight: 300,
            }}
          >
            {t(day.description)}
          </Typography>
        </Stack>
        <img
          src={`/weather-icons/${day.icon}`}
          alt="icon"
          style={{
            width: windowWidth > 992 ? "40%" : "35%",
            alignSelf: "center",
          }}
        />
      </Stack>
    </SwiperSlide>
  ));

  return (
    <Stack
      key={language}
      dir={language === "en" ? "ltr" : "rtl"}
      sx={{ bgcolor: "#c7deff2e", p: 2, borderRadius: 5 }}
      gap={1}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#fff",
          fontWeight: "400",
          fontSize: windowWidth > 992 ? "2rem" : "1.2rem",
        }}
      >
        {t("5-day forecast")}
      </Typography>

      <Stack
        flexDirection={"row"}
        sx={{
          cursor: "grab",
        }}
      >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {dayJSX}
        </Swiper>
      </Stack>
    </Stack>
  );
}
