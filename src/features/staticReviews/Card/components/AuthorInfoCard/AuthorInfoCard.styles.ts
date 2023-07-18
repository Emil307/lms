import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "absolute",
        flexDirection: "column",
        height: "min-content",
        maxWidth: 377,
        bottom: 48,
        right: 48,
        gap: 10,
        padding: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.white16[0],
        backdropFilter: "blur(30px)",

        [theme.fn.smallerThan("sm")]: {
            position: "static",
            maxWidth: "none",
            marginTop: 8,
            backgroundColor: theme.colors.grayLight[0],
            backdropFilter: "none",
        },
    },

    shortQuote: {
        color: theme.colors.white[0],

        [theme.fn.smallerThan("sm")]: {
            color: theme.colors.dark[0],
        },
    },

    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.4)",
        },
    },
    authorFullName: {
        color: theme.colors.white[0],

        [theme.fn.smallerThan("sm")]: {
            color: theme.colors.dark[0],
        },
    },
    authorPosition: {
        color: theme.colors.white56[0],

        [theme.fn.smallerThan("sm")]: {
            color: theme.colors.gray45[0],
        },
    },
}));
