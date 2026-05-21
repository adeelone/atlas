export const featureFlags = {
  liveMode: process.env.ENABLE_LIVE_MODE !== "false",
  ocrUploads: process.env.ENABLE_OCR_UPLOADS === "true",
  paidProviders: process.env.ENABLE_PAID_PROVIDERS === "true"
};

export const cacheWindows = {
  flights: 60 * 60,
  hotels: 6 * 60 * 60,
  activities: 24 * 60 * 60,
  weather: 60 * 60,
  geocoding: 30 * 24 * 60 * 60
};
