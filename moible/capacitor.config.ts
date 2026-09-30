import type { CapacitorConfig } from "@capacitor/cli";

const serverUrl = process.env.CAP_SERVER_URL;

const config: CapacitorConfig = {
  appId: "ai.sahayak.prototype",
  appName: "SAHAYAK AI",
  webDir: "../web-app/out",
  ...(serverUrl
    ? {
        server: {
          url: serverUrl,
          cleartext: true,
        },
      }
    : {}),
};

export default config;
