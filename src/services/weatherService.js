// HeritageQuest Live Weather & Best Time to Visit Service
// Integrates with Open-Meteo free API (api.open-meteo.com) - Zero API key required
// Zero fake data: if network is offline or API fails, returns clear fallback message

const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes in-memory cache
const weatherCache = new Map();

// Interpret WMO Weather interpretation codes (WW)
export function getWeatherInterpretation(code) {
  switch (code) {
    case 0:
      return { label: 'Clear Sky', icon: '☀️', condition: 'clear' };
    case 1:
      return { label: 'Mainly Clear', icon: '🌤️', condition: 'fair' };
    case 2:
      return { label: 'Partly Cloudy', icon: '⛅', condition: 'partly-cloudy' };
    case 3:
      return { label: 'Overcast', icon: '☁️', condition: 'cloudy' };
    case 45:
    case 48:
      return { label: 'Fog / Mist', icon: '🌫️', condition: 'fog' };
    case 51:
    case 53:
    case 55:
      return { label: 'Light Drizzle', icon: '🌦️', condition: 'drizzle' };
    case 61:
    case 63:
    case 65:
      return { label: 'Rain', icon: '🌧️', condition: 'rain' };
    case 71:
    case 73:
    case 75:
      return { label: 'Snow Flurries', icon: '❄️', condition: 'snow' };
    case 80:
    case 81:
    case 82:
      return { label: 'Rain Showers', icon: '🌧️', condition: 'showers' };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: '⛈️', condition: 'storm' };
    default:
      return { label: 'Fair Skies', icon: '🌤️', condition: 'fair' };
  }
}

// Generate actionable "Best time to visit" advice based on current live conditions
export function generateVisitRecommendation(current) {
  if (!current) {
    return 'Live weather unavailable (offline mode). Historical best visiting season: October to March.';
  }

  const { temperature_2m: temp, weather_code: code, wind_speed_10m: wind, precipitation: rain } = current;

  // Severe rain / thunderstorm
  if ((code >= 50 && code <= 65) || (code >= 80 && code <= 99) || (rain && rain > 0.5)) {
    return `Rain or showers detected (${temp}°C) — indoor galleries, sheltered colonnades, or awaiting skies to clear recommended.`;
  }

  // Extreme heat advisory
  if (temp >= 38) {
    return `Extreme heat advisory (currently ${temp}°C) — early morning (6:00–9:00 AM) or sunset hours strongly advised with hydration.`;
  }

  // Warm afternoon
  if (temp >= 32) {
    return `Warm afternoon (${temp}°C) — shaded courtyards or early evening visits recommended. Carry a sun hat.`;
  }

  // Ideal exploration window
  if (temp >= 18 && temp < 32 && code <= 3) {
    return `Ideal exploration window! Pleasant temperature (${temp}°C) and clear conditions for open-air walking.`;
  }

  // Crisp / cool conditions
  if (temp < 18) {
    return `Crisp cool weather (${temp}°C) — great for daytime walking; carry light layers for early morning/evening.`;
  }

  return `Current conditions: ${temp}°C, gentle breeze. Good window for walking courtyards and viewing architecture.`;
}

/**
 * Fetch live weather for monument coordinates from Open-Meteo API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<{success: boolean, data?: object, recommendation: string, error?: string}>}
 */
export async function fetchMonumentWeather(lat, lon) {
  if (!lat || !lon) {
    return {
      success: false,
      error: 'Coordinates missing',
      recommendation: 'Live weather unavailable (offline mode). Historical best visiting season: October to March.'
    };
  }

  const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
  const cached = weatherCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION_MS) {
    return cached.result;
  }

  // Check offline status
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      success: false,
      error: 'Live weather unavailable (offline mode)',
      recommendation: 'Live weather unavailable (offline mode). Historical best visiting season: October to March.'
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather service responded with status ${response.status}`);
    }

    const json = await response.json();
    const current = json.current;

    if (!current) {
      throw new Error('Current weather payload empty');
    }

    const interp = getWeatherInterpretation(current.weather_code);
    const recommendation = generateVisitRecommendation(current);

    const result = {
      success: true,
      data: {
        temperature: current.temperature_2m,
        apparentTemperature: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        weatherCode: current.weather_code,
        windSpeed: current.wind_speed_10m,
        isDay: current.is_day,
        precipitation: current.precipitation,
        weatherLabel: interp.label,
        weatherIcon: interp.icon,
        condition: interp.condition
      },
      recommendation
    };

    weatherCache.set(cacheKey, { timestamp: now, result });
    return result;
  } catch (err) {
    // Return explicit, honest fallback message with ZERO fake data
    const fallbackResult = {
      success: false,
      error: 'Live weather unavailable (offline mode)',
      recommendation: 'Live weather unavailable (offline mode). Historical best visiting season: October to March.'
    };
    return fallbackResult;
  }
}
