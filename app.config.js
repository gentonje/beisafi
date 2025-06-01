export default {
  name: 'beyipoa',
  slug: 'beyipoa',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    supabaseUrl: "https://izolcgjxobgendljwoan.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6b2xjZ2p4b2JnZW5kbGp3b2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NTkyMjQsImV4cCI6MjA1MTIzNTIyNH0.8H5sf-ipUrrtTC08-9zCntiJTqET4-S4YVcmCXK3olg"
  }
} 