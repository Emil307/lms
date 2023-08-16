import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 24,
        gap: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.light[0],
    },
    heading: {
        flexDirection: "column",
        width: "100%",
        gap: 48,

        [theme.fn.smallerThan("xs")]: {
            gap: 24,
        },
    },

    wrapperIcon: {
        width: 64,
        minWidth: 64,
        height: 64,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],

        svg: {
            width: 32,
            height: 32,
        },
    },
}));
