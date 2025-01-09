// MUI Components
import { Stack, Typography, Divider, Box } from "@mui/material";

// Swiper Components & Styles
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// i18next
import { useTranslation } from "react-i18next";

// React Hooks
import { useEffect } from "react";

// Custom Hooks
import { useWeatherData, useWindowWidth, useLanguage } from "../context/CustomHooks";

export default function HoursForecast() {
  const { t, i18n } = useTranslation();
  const language = useLanguage();
  const windowWidth = useWindowWidth();
  const weatherData = useWeatherData().hourlyForecast;

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const hourJSX = weatherData.map((hour, index) => (
    <SwiperSlide
      key={index}
      style={{
        width: windowWidth > 992 ? "calc((1836px / 12) - 10px)" : "100px",
      }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        sx={{
          height: "100%",
          bgcolor: "#00000024",
          borderRadius: 5,
          p: 2,
          color: "#fff",
          fontWeight: "300",
        }}
      >
        <img src={`/weather-icons/${hour.icon}`} alt="icon" />
        <Typography
          sx={{
            fontSize: windowWidth > 992 ? "1.3rem" : "1rem",
            position: "relative",
            padding: language === "en" ? "0 7px 0 0" : "0 0 0 3px",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 3,
              right: language === "en" ? "0" : "100%",
              width: 5,
              height: 5,
              bgcolor: "transparent",
              border: "1px solid #ddd",
              borderRadius: "50%",
            },
          }}
        >
          {hour.temperature}
        </Typography>
        <Box>
          <Divider />
          <Typography
            sx={{
              fontSize: windowWidth > 992 ? "1rem" : ".8rem",
            }}
          >
            {`${hour.time.hour} ${t(hour.time.unit)}`}
          </Typography>
        </Box>
      </Stack>
    </SwiperSlide>
  ));

  return (
    <Stack
      dir={language === "en" ? "ltr" : "rtl"}
      sx={{
        bgcolor: "#c7deff2e",
        p: 2,
        borderRadius: 5,
        overflowX: "hidden",
      }}
      gap={1}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "400",
          fontSize: windowWidth > 992 ? "2rem" : "1.2rem",
        }}
      >
        {t("12-hour forecast")}
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
          {hourJSX}
        </Swiper>
      </Stack>
    </Stack>
  );
}
