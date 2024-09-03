import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 42,
        lineHeight: "46px",
        color: theme.colors.dark[0],
        textAlign: "center",
    },
    description: {
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.dark[0],
        textAlign: "center",
        opacity: 0.5,
    },
}));
