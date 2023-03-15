// prepare.js
const isCi = process.env.CI !== undefined;
const isProd = process.env.NODE_ENV === "production";

if (!isCi && !isProd) {
    require("husky").install();
}
