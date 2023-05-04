export const getDataFromSessionStorage = <T>(name: string): T | null => {
    const item = sessionStorage.getItem(name);
    if (!item) return null;
    return JSON.parse(item);
};
