type TParams<T> = {
    data?: T[];
    value: keyof T;
    label: keyof T | ((item: T) => string);
};

export const prepareOptionsForSelect = <T extends Record<string, any>>({ data = [], value, label }: TParams<T>) => {
    return data.map((item) => ({
        value: String(item[value]),
        label: typeof label === "function" ? label(item) : String(item[label]),
    }));
};
