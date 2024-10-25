import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 24,
        gap: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],

        [theme.fn.smallerThan("sm")]: {
            padding: 16,
        },
    },
    editActionIcon: {
        display: "none",
        width: 32,
        height: 32,
        color: theme.colors.neutralMain50[0],

        [theme.fn.smallerThan("sm")]: {
            display: "initial",
        },
    },
}));
