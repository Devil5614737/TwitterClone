/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["images.unsplash.com","firebasestorage.googleapis.com","cdn.pixabay.com"]
  }
}

module.exports = nextConfig
