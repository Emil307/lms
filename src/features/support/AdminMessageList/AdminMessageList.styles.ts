import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    variant?: "default" | "reverse";
}

export default createStyles((theme, { variant = "default" }: CreateStylesProps) => ({
    root: {
        flexDirection: variant === "default" ? "column" : "column-reverse",
        height: "100%",
        padding: 16,
    },
    messageContainer: {
        flexDirection: "column",
        gap: 8,
    },
}));
