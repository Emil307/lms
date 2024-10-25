import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap-reverse",
        width: "100%",
        gap: 32,
        marginTop: 32,

        [theme.fn.smallerThan("xs")]: {
            marginTop: 24,
        },
    },
    item: {
        width: 48,
        height: 48,
        border: "none",
        borderRadius: 8,
        color: theme.colors.dark[0],
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",

        ":first-of-type, :last-of-type": {
            ":disabled": {
                display: "none",
            },
        },

        "&[data-active]": {
            color: theme.colors.neutralWhite[0],
            backgroundColor: theme.colors.dark[0],

            ":hover": {
                backgroundColor: theme.colors.dark[0],
            },
        },

        "&[data-dots]": {
            paddingTop: 10,
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.neutralWhite[0],
        },

        ":hover": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    perPageInfo: {
        span: {
            color: theme.colors.dark[0],
        },
    },
}));
