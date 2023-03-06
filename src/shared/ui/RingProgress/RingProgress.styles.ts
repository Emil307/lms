import { createStyles } from "@mantine/core";

export default createStyles((_theme, { size }: { size?: "small" | "normal" }) => ({
    label: {
        right: size === "small" ? "5.7px !important" : "16.7px !important",
        left: size === "small" ? "5.7px !important" : "16.7px !important",
    },
}));
