---
name: bowmark-weather-channel
description: |
  Read The Weather Channel for your agent. Current weather conditions, forecasts,
  alerts, air quality, pollen, radar and tropical storms for any location. Typed results
  through Bowmark, tested on a schedule, no Weather Channel API key. Use when the
  user names The Weather Channel or a link to weather.com.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# The Weather Channel through Bowmark

1. `get_library({ query: "weather.com" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const weather_channel = bowmark.providers.weather_channel;
return await weather_channel.searchLocations("Boston, MA");
```

Public, no sign-in: searchLocations, searchNews, getCMSContent, getLocation, getCurrentConditions, getDailyForecast, getHourlyForecast, listAlerts, getAlertDetails, getObservations, getFifteenMinuteForecast, getAirQuality, getHourlyAirQuality, getAlmanac, getHistoricalHourly, getHistoricalDaily, getHistoricalDailySummary, getPollenForecast, getCurrentTropicalPosition, getTropicalCone.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
