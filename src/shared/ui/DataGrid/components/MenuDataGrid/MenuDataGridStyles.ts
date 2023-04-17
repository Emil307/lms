import { createStyles } from "@mantine/core";

export const useMenuStyles = createStyles((theme) => ({
    wrapper: {
        padding: 8,
        right: "16px !important",
        left: "auto !important",
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
