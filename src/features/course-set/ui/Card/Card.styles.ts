import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "32px 24px",
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    content: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap-reverse",
        minHeight: 136,
        gap: 32,
    },
    description: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 120,
        height: 120,
        borderRadius: 24,
    },

    iconButtonLinkCourse: {
        height: 18,
        width: 18,
        minHeight: 18,
        minWidth: 18,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.dark[0],

        svg: {
            width: 9,
            color: theme.colors.secondaryHover[0],
            strokeWidth: 5,
        },
    },
}));
