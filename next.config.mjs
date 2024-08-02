/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置静态文件的缓存策略
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // async headers() {
  //   return [
  //     {
  //       // 匹配所有静态资源
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable", // 缓存一年
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
