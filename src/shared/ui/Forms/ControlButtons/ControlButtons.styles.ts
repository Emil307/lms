import { CSSObject, MantineTheme, createStyles } from "@mantine/core";
import { ControlButtonsProps } from "./ControlButtons";

interface CreateStylesParams {
    variant: ControlButtonsProps["variant"];
}

export default createStyles((theme, { variant }: CreateStylesParams) => ({
    root: {
        ...getStylesForVariant(theme, { variant }),
    },
}));

const getStylesForVariant = (theme: MantineTheme, { variant }: CreateStylesParams): CSSObject => {
    switch (variant) {
        case "modal": {
            return {};
        }

        case "modalTable": {
            return {
                justifyContent: "space-between",
                button: {
                    width: "100%",
                    maxWidth: 252,
                },
            };
        }

        default:
            return {
                button: {
                    width: "100%",
                    maxWidth: 252,
                },

                [theme.fn.smallerThan("xs")]: {
                    flexDirection: "column",

                    button: {
                        maxWidth: "none",
                    },
                },
            };
    }
};
