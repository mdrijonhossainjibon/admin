interface AppConfig {
  API_URL: string;
}

const prodConfig: AppConfig = {
  API_URL:  `${window.location.protocol}//${window.location.host}`,
};

const devConfig: AppConfig = {
  API_URL: process.env.API_URL || "trade.mobidax.io",
};

export const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
