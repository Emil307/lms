type TParams = {
    number?: number;
    type?: "percentage" | "currency";
};

export const getLocaleString = ({ number, type = "currency" }: TParams) => {
    if (!number) {
        return "";
    }
    const sign = type === "currency" ? "₽" : "%";

    return `${number.toLocaleString()} ${sign}`;
};
