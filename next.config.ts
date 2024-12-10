import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
    // Opciones específicas para Sass
    // Si "silenceDeprecations" es algo personalizado, retíralo si no está documentado.
  }
};

export default nextConfig;
