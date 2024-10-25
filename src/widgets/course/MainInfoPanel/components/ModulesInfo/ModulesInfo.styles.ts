import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 12,
        paddingTop: 48,
        width: "100%",
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    iconContainer: {
        padding: 11,
        border: `1px solid ${theme.colors.neutralGray300[0]}`,
        borderRadius: 16,
        svg: {
            width: 32,
            height: 32,
        },
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    modulesContainer: {
        backgroundColor: theme.colors.neutralWhite[0],
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        flex: 1,
        gap: 24,
        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
    title: {
        fontSize: 16,
        lineHeight: "22px",
    },
    description: {
        fontSize: 18,
        lineHeight: "24px",
    },
}));
