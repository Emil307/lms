import { createStyles } from "@mantine/core";

export const useMenuStyles = createStyles((theme) => ({
    root: {
        width: 240,
    },
    action: {
        display: "flex",
        marginLeft: "auto",
        borderRadius: 60,
        zIndex: 99,
        cursor: "pointer",
        pointerEvents: "fill",
        position: "relative",
        ":hover": {
            backgroundColor: theme.colors.secondary8[0],
        },
    },
}));
