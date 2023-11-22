export const getArrayUniqueByKey = <T extends Record<string, any>>(array: T[], key: keyof T) => {
    return array.filter((item, index) => array.findIndex((subItem) => item[key] === subItem[key]) === index);
};
