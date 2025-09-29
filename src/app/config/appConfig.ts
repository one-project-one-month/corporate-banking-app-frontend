// src/config/AppConfig.ts
const getDynamicBaseUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const urlParam = params.get("baseUrl");

  // if query param is set, use it. otherwise fall back to .env
  return urlParam || import.meta.env.VITE_BASE_URL;
};

const AppConfig = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BASE_URL: getDynamicBaseUrl(),
};

export default AppConfig;
