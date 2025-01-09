import PropTypes from "prop-types";

// Hooks
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

// Context
import { WeatherDataContext, IsLoadingContext } from "./AllContexts";

// Import Custom Hooks
import { useCity } from "../context/CustomHooks";

const API_KEY = `ugqubPfa1GIp6I9X4ngr8MYUqCAB0tmF`;

// Handle Date
const dateUtils = (action, date) => {
  const getDate = new Date(date), days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const hour = getDate.getHours();
  if (action === "formatHour") return [`${hour % 12 || 12}:00`, `${hour >= 12 ? "PM" : "AM"}`];
  if (action === "getDayOfWeek") return days[getDate.getUTCDay()];
  if (action === "getDayAndMonth") return `${getDate.getDate()}/${getDate.getMonth() + 1}`;
  if (action === "isToday") return new Date(date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
};

// Handle Icon
const getIconFileName = (iconNumber) => {
  if (iconNumber === 1) return "1.svg";
  if (iconNumber === 6) return "6.svg";
  if (iconNumber === 33) return "33.svg";
  if ([2, 3, 4, 5].includes(iconNumber)) return "2-3-4-5.svg";
  if ([7,8,11,44,43,38].includes(iconNumber)) return "7-8-11-44-43-38.svg";
  if ([12,18,24,25,26,29].includes(iconNumber)) return "12-18-24-25-26-29.svg";
  if ([13,14,15,16,17,23,21,20].includes(iconNumber)) return "13-14-15-16-17-23-21-20.svg";
  if ([34,35,36,37,38].includes(iconNumber)) return "34-35-36-37-38.svg";
  if ([39,40,41,42].includes(iconNumber)) return "39-40-41-42.svg";
};

// Converts Fahrenheit to Celsius
const convertFtoC = (f) => Math.round((f - 32) / 1.8);

export const WeatherDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const selectedCity = useCity();

  const [weatherData, setWeatherData] = useState({
    currentWeather: {
      temperature: null,
      min: null,
      max: null,
      humidity: null,
      wind: null,
      icon: null,
      description: "null",
    },
    hourlyForecast: [
      {
        icon: null,
        temperature: null,
        time: {
          hour: null,
          unit: null,
        },
      },
    ],
    dailyForecast: [
      {
        description: null,
        isToday: null,
        icon: null,
        temperature: {
          min: null,
          max: null,
        },
        day: {
          text: null,
          number: null,
        },
      },
    ],
  });

  const fetchWeatherData = (endpoint, params = {}) => ({
    method: "get",
    maxBodyLength: Infinity,
    url: `https://dataservice.accuweather.com${endpoint}`,
    params: { apikey: API_KEY, ...params },
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const currentWeather = fetchWeatherData(`/currentconditions/v1/${selectedCity.key}`, { details: true });
    const dayWeather = fetchWeatherData(`/forecasts/v1/daily/1day/${selectedCity.key}`);
    const hourlyWeather = fetchWeatherData(`/forecasts/v1/hourly/12hour/${selectedCity.key}`, { metric: true });
    const dailyWeather = fetchWeatherData(`/forecasts/v1/daily/5day/${selectedCity.key}`, { metric: true });

    Promise.all([axios.request(currentWeather), axios.request(dayWeather), axios.request(hourlyWeather), axios.request(dailyWeather)])
      .then(([currentResponse, dayResponse, hourlyResponse, dailyResponse]) => {
        const currentData = currentResponse.data[0];
        const dayData = dayResponse.data.DailyForecasts[0];
        const hourlyData = hourlyResponse.data;
        const dailyData = dailyResponse.data;

        setWeatherData({
          currentWeather: {
            temperature: Math.round(currentData.Temperature.Metric.Value),
            min: convertFtoC(dayData.Temperature.Minimum.Value),
            max: convertFtoC(dayData.Temperature.Maximum.Value),
            humidity: currentData.RelativeHumidity,
            wind: currentData.Wind.Speed.Metric.Value,
            icon: getIconFileName(currentData.WeatherIcon),
            description: currentData.WeatherText.trim(),
          },
          hourlyForecast: hourlyData.map((hour) => ({
            icon: getIconFileName(hour.WeatherIcon),
            temperature: Math.round(hour.Temperature.Value),
            time: {
              hour: dateUtils("formatHour", hour.DateTime)[0],
              unit: dateUtils("formatHour", hour.DateTime)[1],
            },
          })),
          dailyForecast: dailyData.DailyForecasts.map((day) => ({
            description: day.Day.IconPhrase,
            isToday: dateUtils("isToday", day.Date),
            icon: getIconFileName(day.Day.Icon),
            temperature: {
              min: Math.round(day.Temperature.Minimum.Value),
              max: Math.round(day.Temperature.Maximum.Value),
            },
            day: {
              text: dateUtils("getDayOfWeek", day.Date),
              number: dateUtils("getDayAndMonth", day.Date),
            },
          })),
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e)
        setIsLoading("error");
      });
  }, [selectedCity]);

  return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherData, isLoading }}>
      <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </IsLoadingContext.Provider>
    </WeatherDataContext.Provider>
  );
};

WeatherDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
