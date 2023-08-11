import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        gap: 6,
    },
    icon: {
        width: 24,
        height: 24,
        minHeight: 24,
        minWidth: 24,
        path: {
            fill: theme.colors.secondaryHover[0],
        },
    },
}));
