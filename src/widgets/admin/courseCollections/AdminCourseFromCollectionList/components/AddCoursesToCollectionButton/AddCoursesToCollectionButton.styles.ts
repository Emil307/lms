import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    actionIcon: {
        backgroundColor: "transparent",
        color: theme.colors.dark[0],

        ":hover": {
            backgroundColor: "transparent",
            color: theme.colors.primaryHover[0],
        },
        ":disabled": {
            backgroundColor: "transparent",
            color: theme.colors.neutralMain50[0],
        },
    },
}));
