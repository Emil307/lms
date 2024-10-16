import { CSSObject, MantineTheme, TitleOrder, createStyles } from "@mantine/core";

interface CreateStylesParams {
    order?: TitleOrder;
}

export default createStyles((theme, { order = 1 }: CreateStylesParams) => ({
    root: {
        overflowWrap: "anywhere",
        ...getStylesByOrder(theme, { order }),
    },
}));

const getStylesByOrder = (theme: MantineTheme, { order = 1 }: CreateStylesParams): CSSObject => {
    switch (order) {
        case 1: {
            return {
                fontWeight: 600,
                fontSize: 32,
                lineHeight: "40px",

                [theme.fn.smallerThan("md")]: {
                    fontSize: 24,
                    lineHeight: "32px",
                },
            };
        }
        case 2: {
            return {
                fontWeight: 600,
                fontSize: 24,
                lineHeight: "32px",

                [theme.fn.smallerThan("md")]: {
                    fontSize: 20,
                    lineHeight: "24px",
                },
            };
        }
        case 3: {
            return {
                fontWeight: 600,
                fontSize: 20,
                lineHeight: "24px",

                [theme.fn.smallerThan("md")]: {
                    fontSize: 18,
                    lineHeight: "24px",
                },
            };
        }
        case 4: {
            return {
                fontWeight: 600,
                fontSize: 18,
                lineHeight: "24px",

                [theme.fn.smallerThan("md")]: {
                    fontSize: 16,
                    lineHeight: "22px",
                },
            };
        }

        default:
            return {};
    }
};
