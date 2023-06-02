type TParams<T> = {
    data?: T[];
    value: keyof T;
    label: keyof T | ((item: T) => string);
    isActive?: keyof T;
    emptyOptionLabel?: string;
};

export const prepareOptionsForSelect = <T extends Record<string, any>>({
    data = [],
    value,
    label,
    isActive,
    emptyOptionLabel,
}: TParams<T>) => {
    const options = [];
    if (emptyOptionLabel) {
        options.push({ value: "null", label: emptyOptionLabel });
    }
    data.forEach((item) => {
        const optionData = {
            value: String(item[value]),
            label: typeof label === "function" ? label(item) : String(item[label]),
            ...(isActive ? { isActive: !!item[isActive] } : {}),
        };
        options.push(optionData);
    });

    return options;
};
