import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {},
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.65)",
        },
    },
    chevronIconWrapper: {
        minHeight: 16,
        minWidth: 16,
        width: 16,
        height: 16,
        border: "none",
        color: theme.colors.dark[0],
    },
    menuItem: {
        padding: 12,

        ".mantine-Menu-itemIcon": {
            width: 16,
            height: 16,
            marginRight: 8,
            color: theme.colors.primary[0],
        },

        ".mantine-Menu-itemLabel": {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "16px",
            color: theme.colors.dark[0],
        },
    },
}));
