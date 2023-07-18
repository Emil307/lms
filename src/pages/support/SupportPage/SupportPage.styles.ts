import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    contentContainer: {
        gap: 24,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
            gap: 32,
        },
    },

    iconMessageDotsWrapper: {
        width: 32,
        height: 32,
        color: theme.colors.primaryHover[0],

        svg: {
            width: 32,
            height: 32,
            path: {
                fill: theme.colors.secondary[0],
                transform: "scale(1.4)",
            },
        },

        [theme.fn.smallerThan("md")]: {
            width: 24,
            height: 24,

            svg: {
                width: 24,
                height: 24,
                path: {
                    transform: "scale(1)",
                },
            },
        },
    },

    faqContainer: {
        width: "100%",
        maxWidth: 840,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "none",
        },
    },

    chatContainer: {
        flex: 1,
        width: "100%",
        maxWidth: 456,
        minWidth: 400,
        minHeight: 550,
        height: "min-content",
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            maxWidth: "none",
            minWidth: "auto",
        },
    },
    chatHeader: {
        paddingBlock: 24,
        paddingInline: 32,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,

        [theme.fn.smallerThan("md")]: {
            paddingInline: 24,
        },
    },
}));
