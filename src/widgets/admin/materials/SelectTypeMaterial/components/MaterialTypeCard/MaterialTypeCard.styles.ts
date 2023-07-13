import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 24,
        gap: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.light[0],
    },
    heading: {
        width: "100%",
        gap: 16,
    },
    title: {
        flex: 1,
        maxWidth: 130,
    },
    wrapperIcon: {
        width: 64,
        height: 64,
        borderRadius: 24,
        border: "none",
        backgroundColor: theme.colors.white[0],

        svg: {
            width: 32,
            height: 32,
        },
    },
}));
