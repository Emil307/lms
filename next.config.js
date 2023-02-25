/** @type {import('next').NextConfig} */
const withRoutes = require("nextjs-routes/config")();
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        esmExternals: false,
    },
    swcMinify: true,
};

module.exports = withRoutes(nextConfig);
