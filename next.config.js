/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 배포를 위한 기본 설정
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig 