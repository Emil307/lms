import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    titleIcon: {
        color: theme.colors.primaryHover[0],

        svg: {
            width: 32,
            height: 32,
        },

        [theme.fn.smallerThan("md")]: {
            svg: {
                width: 24,
                height: 24,
            },
        },
    },

    content: {
        flexWrap: "wrap-reverse",
        padding: 32,
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column-reverse",
        },
    },

    settingsInfo: {
        flexDirection: "column",
        minWidth: 400,
        flex: 1,
        gap: 24,

        [theme.fn.smallerThan("sm")]: {
            minWidth: "auto",
        },
    },
}));
