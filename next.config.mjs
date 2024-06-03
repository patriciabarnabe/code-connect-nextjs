/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração de segurança para renderizar imagens vindas de URL externas: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
