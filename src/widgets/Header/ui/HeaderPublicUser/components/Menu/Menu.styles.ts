import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        cursor: "pointer",
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.65)",
        },
    },
    chevronIconWrapper: {
        width: 16,
        height: 16,
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
