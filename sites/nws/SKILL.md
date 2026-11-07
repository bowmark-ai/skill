---
name: bowmark-nws
description: |
  Read the National Weather Service (weather.gov) for your agent: forecasts, alerts,
  current conditions, radar and forecast-office products for any US place. Typed results
  through Bowmark, tested on a schedule. Use when the user asks about US weather, names
  the National Weather Service or NOAA, or links to weather.gov.
allowed-tools: mcp__bowmark__get_library, mcp__bowmark__run, mcp__bowmark__wait_for_sign_in
---

# National Weather Service through Bowmark

1. `get_library({ query: "api.weather.gov" })` for the exact signatures.
2. `run({ script })` with one call, or several in `Promise.allSettled`:

```js
const nws = bowmark.providers.nws;
return await nws.getForecast({ place: "Boston, MA" });
```

Public, no sign-in: searchLocation, getPoint, getForecast, getHourlyForecast, getActiveAlerts, getCurrentConditions, getForecastDiscussion, getAlert, findStations, getObservationHistory, getGridpointData, findZones, getZoneForecast, listAlertTypes, searchAlerts, getAlertCounts, getOffice, getMarineForecast, getTextProduct, getWeatherStories, listTextProducts, findRadarStations.

Install: see github.com/bowmark-ai/plugin. A key starts with a free $10.
