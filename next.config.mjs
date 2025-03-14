/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

// Проверка и значение по умолчанию для S3_ENDPOINT
const s3Endpoint = process.env.S3_ENDPOINT || 'http://localhost:9000';
let s3Hostname = 'localhost'; // Значение по умолчанию

try {
  s3Hostname = new URL(s3Endpoint).hostname;
} catch (error) {
  console.error('Invalid S3_ENDPOINT:', s3Endpoint);
  console.error('Falling back to default hostname:', s3Hostname);
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  trailingSlash: false,
  poweredByHeader: false,

  // Оптимизация изображений
  images: {
    domains: [
      process.env.S3_IMAGES_BUCKET,
      s3Hostname, // Используем обработанное значение
    ],
    formats: ["image/webp", "image/avif"], // Добавлен AVIF для лучшего сжатия
    minimumCacheTTL: 86400,
    deviceSizes: [320, 420, 768, 1024, 1200], // Поддержка адаптивных размеров
    imageSizes: [16, 32, 48, 64, 96], // Оптимизированные размеры
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Перенаправления
  rewrites: async () => [
    {
      source: "/storage/:path*",
      destination: `${s3Endpoint}/:path*`,
    },
  ],

  // HTTP заголовки безопасности
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

// Dev-настройки
if (isDev) {
  nextConfig.experimental = {
    serverActions: {
      allowedOrigins: ["localhost:3000", "**.app.github.dev"],
    },
  };

  nextConfig.images.remotePatterns = [
    {
      protocol: "https",
      hostname: "**",
      port: "",
      pathname: "/**",
    },
  ];

  nextConfig.productionBrowserSourceMaps = true;
}

export default nextConfig;
