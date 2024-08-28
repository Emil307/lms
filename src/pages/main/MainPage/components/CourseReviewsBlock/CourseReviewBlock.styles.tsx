import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 42,
        color: theme.colors.dark[0],
        textAlign: "center",
    },
    description: {
        fontSize: 20,
        color: theme.colors.dark[0],
        textAlign: "center",
        opacity: 0.5,
    },
}));
