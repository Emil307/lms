import { CSSObject, MantineTheme, createStyles } from "@mantine/core";

interface CreateStylesParams {
    variant?: "localIcon" | "iconFromPackage";
}

export default createStyles((theme, { variant = "localIcon" }: CreateStylesParams) => ({
    root: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",

        ...getStylesByVariant(theme, { variant }),
    },
}));

const getStylesByVariant = (theme: MantineTheme, { variant = "localIcon" }: CreateStylesParams): CSSObject => {
    if (variant === "localIcon") {
        return {
            svg: {
                fill: theme.colors.gray45[0],
                transform: "scale(0.4)",
            },
        };
    }

    return {
        svg: {
            strokeWidth: 1.3,
        },
    };
};
