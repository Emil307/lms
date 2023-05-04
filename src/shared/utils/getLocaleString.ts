type TProps = {
    number?: number;
    type?: "percentage" | "currency";
};

export const getLocaleString = ({ number, type = "currency" }: TProps) => {
    if (!number) {
        return "";
    }
    const sign = type === "currency" ? "₽" : "%";

    return `${number.toLocaleString()} ${sign}`;
};
