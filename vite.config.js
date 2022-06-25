import {defineConfig, loadEnv} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import netlifyPlugin from '@netlify/hydrogen-platform/plugin';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  const shopifyConfig = {
    storeDomain: env.STORE_DOMAIN,
    storefrontToken: env.STOREFRONT_TOKEN,
    storefrontApiVersion: '2022-04',
  };

  return {
    plugins: [hydrogen(shopifyConfig), netlifyPlugin()],
    optimizeDeps: {include: ['@headlessui/react']},
    test: {
      globals: true,
      testTimeout: 10000,
      hookTimeout: 10000,
    },
    define: {
      __API_KEY__: env.API_KEY,
      __AUTH_DOMAIN__: env.AUTH_DOMAIN,
      __STORAGE_BUCKET__: env.STORAGE_BUCKET,
      __MESSAGING_SENDER_ID__: env.MESSAGING_SENDER_ID,
      __APP_ID__: env.APP_ID,
      __URI__: env.URI,
      __STORE_DOMAIN__: env.STORE_DOMAIN,
      __STOREFRONT_TOKEN__: env.STOREFRONT_TOKEN,
    },
  };
});
