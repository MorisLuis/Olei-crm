import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
    // Opciones específicas para Sass
    // Si "silenceDeprecations" es algo personalizado, retíralo si no está documentado.
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: true, // true para redirección 301 permanente, false para 302 temporal
    },
    {
      source: '/dashboard',
      destination: '/dashboard/sells',
      permanent: true,
    },
    { source: '/bitacora', destination: '/dashboard/bitacora', permanent: true},
    { source: '/calendar', destination: '/dashboard/calendar', permanent: true},
    { source: '/clients', destination: '/dashboard/clients', permanent: true},
    { source: '/cobranza', destination: '/dashboard/cobranza', permanent: true},
    { source: '/sells', destination: '/dashboard/sells', permanent: true},
    { source: '/settings', destination: '/dashboard/settings', permanent: true}
  ],

};

export default nextConfig;
