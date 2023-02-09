/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        esmExternals: false,
    },
    swcMinify: true,
};

module.exports = nextConfig;
