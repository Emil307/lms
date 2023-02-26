/** @type {import('next').NextConfig} */
const withRoutes = require("nextjs-routes/config")();

const withSVGR = (nextConfig) => {
    nextConfig.webpack = (config) => {
        config.module.rules.map((rule) => {
            if (rule.test !== undefined && rule.test.source.includes("|svg|")) {
                rule.test = new RegExp(rule.test.source.replace("|svg|", "|"));
            }
        });
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    };
    return nextConfig;
};

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        esmExternals: false,
    },
    swcMinify: true,
};

module.exports = withRoutes(withSVGR(nextConfig));
