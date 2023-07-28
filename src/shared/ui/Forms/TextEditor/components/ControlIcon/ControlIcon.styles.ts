import { CSSObject, MantineTheme, createStyles } from "@mantine/core";

interface CreateStylesParams {
    variant?: "localIcon" | "iconFromPackage";
}

export default createStyles((theme, { variant = "localIcon" }: CreateStylesParams) => ({
    root: {
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
            color: theme.colors.gray45[0],
            strokeWidth: 1.3,
        },
    };
};
