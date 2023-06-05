import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: "48px 24px 56px",
        gap: 48,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    content: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],

        p: {
            margin: 0,
        },
    },
}));
