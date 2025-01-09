// MUI Components & MUI Icons
import { Stack, Typography, TextField, Collapse } from "@mui/material";
import { PublicRounded, PinDropRounded } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

// i18next
import { useTranslation } from "react-i18next";

// Hooks
import { useState, useEffect } from "react";

// Import Custom Hooks
import {
  useCity,
  useSetCity,
  useLanguage,
  useSetLanguage,
  useSetIsLoading,
} from "../context/CustomHooks";
const cities = [
  { name: "Cairo", key: 127164 },
  { name: "Alexandria", key: 126964 },
  { name: "Luxor", key: 130201 },
  { name: "Aswan", key: 127358 },
  { name: "Ismailia", key: 127004 },
  { name: "Fayoum", key: 126923 },
  { name: "Mansoura", key: 126814 },
  { name: "Tanta", key: 126947 },
  { name: "Hurghada", key: 126883 },
  { name: "Suez", key: 127333 },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const setIsLoading = useSetIsLoading();
  const language = useLanguage();
  const setLanguage = useSetLanguage();
  const selectedCity = useCity();
  const setSelectedCity = useSetCity();

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = cities.filter((city) => {
    const cityNameTranslated = t(city.name);
    return cityNameTranslated.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, []);

  const switchLanguage = () => {
    const currentLanguage = language === "en" ? "ar" : "en";
    setLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);
  };

  const changeCity = (city) => {
    setSearchTerm("");
    setSelectedCity(city);
    localStorage.setItem("city", JSON.stringify(city));
    setIsFocused(false);
    setIsLoading(true);
  };

  return (
    <Stack
      dir={language === "en" ? "ltr" : "rtl"}
      flexDirection="row"
      className="search-container"
      sx={{ position: "relative" }}
    >
      <PublicRounded
        sx={{
          width: "40px",
          height: "40px",
          padding: "5px",
          borderRadius: language === "en" ? "5px 0 0 5px" : "0 5px 5px 0",
          backgroundColor: "#8ba2af",
          color: "#fff",
        }}
      />

      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={`${t(selectedCity.name)}...`}
        name="city"
        sx={{
          width: "100%",
          input: {
            height: 24,
            bgcolor: "#c7deff2e",
            p: 1,
            color: "#fff",
            border: "none",
            "::placeholder": {
              color: "#d1edff94",
              opacity: 1,
              fontWeight: "300",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              transition: "border-color .3s",
              border: "none",
              borderRadius: "0",
              borderBottom: "2px solid #8ba2af",
            },
            "&:hover fieldset": {
              border: "none",
              borderBottom: "2px solid #8ba2af",
            },
            "&.Mui-focused fieldset": {
              transition: "border-color .3s",
              border: "none",
              borderBottom: "2px solid #016db2",
            },
          },
        }}
      ></TextField>

      <img src="/language.svg"
        alt="language"
        onClick={switchLanguage}
        style={{
          width: "40px",
          height: "40px",
          padding: "5px",
          borderRadius: language === "en" ? "0 5px 5px 0" : "5px 0 0 5px",
          backgroundColor: "#8ba2af",
          cursor: "pointer",
        }}
      />
      <Stack
        sx={{
          maxHeight: 200,
          overflowY: "auto",
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 1,
          bgcolor: "#c7deff2e",
          backdropFilter: "blur(40px)",
          borderRadius: "0 0 10px 10px",
          visibility: isFocused ? "visible" : "hidden",
          opacity: isFocused ? 1 : 0,
          transition: "all 0.3s ease-in-out",
          animation: `${isFocused ? "show" : "hide"} 0.3s ease-in-out forwards`,
        }}
      >
        <TransitionGroup>
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => {
              return (
                <Collapse timeout={500} key={index}>
                  <Typography
                    onClick={() => changeCity(city)}
                    sx={{
                      p: 1,
                      cursor: "pointer",
                      color: "#fff",
                      transition: "background-color .3s",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        bgcolor: "#ffffff20",
                      },
                      ...(index !== filteredCities.length - 1 && {
                        borderBottom: "1px solid #b9e4ff61",
                      }),
                    }}
                  >
                    <PinDropRounded
                      sx={{
                        margin: language === "en" ? "0 5px 0 0" : "0 0 0 5px",
                      }}
                    />
                    {t(city.name)}
                  </Typography>
                </Collapse>
              );
            })
          ) : (
            <Collapse timeout={500}>
              <Typography
                sx={{
                  p: "10px",
                  color: "#fff",
                }}
              >
                City Not Found
              </Typography>
            </Collapse>
          )}
        </TransitionGroup>
      </Stack>
    </Stack>
  );
}
