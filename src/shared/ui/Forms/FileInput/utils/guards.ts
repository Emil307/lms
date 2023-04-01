export const isFile = (item: unknown): item is File => {
    return typeof item === "object" && item !== null && "type" in item;
};
