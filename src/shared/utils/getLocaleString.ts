type TParams = {
    number?: number;
    type?: "percentage" | "currency";
};

export const getLocaleString = ({ number = 0, type = "currency" }: TParams) => {
    const sign = type === "currency" ? "₽" : "%";

    return `${number.toLocaleString()} ${sign}`;
};
