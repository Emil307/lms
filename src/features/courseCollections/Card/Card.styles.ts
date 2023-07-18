import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 24px",
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
        height: "100%",
    },
    content: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap-reverse",
        minHeight: 136,
        gap: 32,
    },
    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 120,
        borderRadius: 24,
        color: theme.colors.secondary[0],
        backgroundColor: theme.colors.light[0],
    },

    iconButtonLinkCourse: {
        height: 18,
        width: 18,
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
