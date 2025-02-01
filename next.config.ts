/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
};

export default nextConfig;