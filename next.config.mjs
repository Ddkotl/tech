/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/storage/:path*",
        destination: `${process.env.S3_ENDPOINT}/:path*`,
      },
    ];
  },
};
//Настройка для Github Codespace
if (isDev) {
  nextConfig.experimental = {
    serverActions: { allowedOrigins: ["localhost:3000", "**.app.github.dev"] },
  };
}

export default nextConfig;
