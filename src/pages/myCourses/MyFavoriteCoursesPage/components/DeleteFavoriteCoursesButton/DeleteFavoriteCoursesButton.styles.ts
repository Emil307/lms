import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    actionIcon: {
        width: 72,
        minWidth: 72,
        height: 48,
        paddingInline: 24,
        paddingBlock: 12,
        borderRadius: 8,
        border: `2px solid ${theme.colors.gray20[0]}`,
        backgroundColor: "transparent",
        color: theme.colors.dark[0],

        ":hover": {
            backgroundColor: "transparent",
            color: theme.colors.primaryHover[0],
        },
        ":disabled": {
            backgroundColor: "transparent",
            color: theme.colors.gray45[0],
        },
    },
}));
