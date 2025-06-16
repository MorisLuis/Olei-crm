import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://www.oleionline.com',
        },
        {
          key: 'Access-Control-Allow-Credentials',
          value: 'true',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET,POST,PUT,DELETE,OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'X-Requested-With, Accept, Content-Type, Authorization',
        },
      ],
    },
  ],
  redirects: async () => [
    { source: '/', destination: '/login', permanent: true },
    { source: '/dashboard', destination: '/dashboard/sells', permanent: true },
    { source: '/bitacora', destination: '/dashboard/bitacora', permanent: true },
    { source: '/calendar', destination: '/dashboard/calendar', permanent: true },
    { source: '/clients', destination: '/dashboard/clients', permanent: true },
    { source: '/cobranza', destination: '/dashboard/cobranza', permanent: true },
    { source: '/sells', destination: '/dashboard/sells', permanent: true },
    { source: '/settings', destination: '/dashboard/settings', permanent: true },
  ],
};

export default bundleAnalyzer(nextConfig);
