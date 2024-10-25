import { createStyles } from "@mantine/core";

export const useMenuItemStyles = createStyles((theme) => ({
    wrapper: {
        ":hover": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    menuItem: {
        padding: 0,
    },
    inner: {
        padding: 12,
        cursor: "pointer",
        borderRadius: 8,
        fontSize: 14,
        lineHeight: "16px",
    },
}));
