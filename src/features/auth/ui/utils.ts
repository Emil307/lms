export const getPath = () => {
    if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        return url.pathname;
    }
    return "";
};
