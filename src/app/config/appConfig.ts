// src/config/AppConfig.ts

//for microservice matter, added dynamic baseUrl via params
const getDynamicBaseUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const urlParam = params.get("baseUrl");

  return urlParam || import.meta.env.VITE_BASE_URL || "http://localhost:8080/";
};

const AppConfig = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BASE_URL: getDynamicBaseUrl(),
};

export default AppConfig;
