/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 배포를 위한 설정
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/PORTFOLIO' : '',
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // 정적 내보내기를 위해 필요
  },
}

module.exports = nextConfig 