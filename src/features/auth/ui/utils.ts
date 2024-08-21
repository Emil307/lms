export const getPath = () => {
    const url = new URL(window.location.href);
    return url.pathname;
};
