import { createStyles } from "@mantine/core";

export default createStyles((theme, { size }: { size: "small" | "normal" }) => ({
    symbolGroup: {
        '&:has(>input[data-active="true"]) ~ div>label>div>svg>path': {
            stroke: theme.colors.gray20[0],
            fill: "none",
        },

        svg: {
            scale: size === "small" ? "0.83 !important" : 1,
        },

        "svg path": {
            stroke: theme.colors.secondary[0],
            fill: theme.colors.secondary[0],
        },
    },
}));
