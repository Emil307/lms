import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        gap: 24,
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            textAlign: "center",
        },
    },
    iconContainer: {
        minWidth: 96,
        minHeight: 96,
    },
    description: {
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "14px",
    },
}));
