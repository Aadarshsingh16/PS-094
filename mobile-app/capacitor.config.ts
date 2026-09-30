import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.sahayak.app',
  appName: 'SAHAYAK AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#FFFFFF',
    allowMixedContent: true
  }
};

export default config;
