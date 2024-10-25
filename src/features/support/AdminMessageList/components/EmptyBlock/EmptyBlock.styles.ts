import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 16,
        backgroundColor: theme.colors.neutralGray100[0],
    },
    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],

        "svg path": {
            fill: theme.colors.secondary[0],
        },
    },
}));
