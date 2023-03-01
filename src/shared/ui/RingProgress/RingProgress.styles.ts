import { createStyles } from "@mantine/core";

export default createStyles((_theme, { size }: { size?: "small" | "normal" }) => ({
    root: {
        width: "96px !important",
        height: "96px !important",

        svg: {
            width: "96px !important",
            height: "96px !important",

            circle: {
                cx: 48,
                cy: 48,
                r: 43,
                "&:first-child": {
                    cy: 72,
                },
            },
        },

        ...(size === "small" && {
            width: "48px !important",
            height: "48px !important",

            svg: {
                width: "48px !important",
                height: "48px !important",

                circle: {
                    cx: 24,
                    cy: 24,
                    r: 21.5,
                    "&:first-child": {
                        cy: 36,
                    },
                },
            },
        }),
    },
    label: {
        right: size === "small" ? "5.7px !important" : "16.7px !important",
        left: size === "small" ? "5.7px !important" : "16.7px !important",
    },
}));
