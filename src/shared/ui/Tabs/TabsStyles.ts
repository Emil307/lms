import { createStyles } from "@mantine/core";

export const useTabsStyles = createStyles((theme) => ({
    tabsList: {
        borderBottom: "none",
        backgroundColor: theme.colors.grayLight[0],
        gap: 4,
        padding: 4,
        width: "max-content",
        borderRadius: 8,
    },
    tab: {
        padding: 0,
        color: theme.colors.gray45[0],
        borderRadius: 8,
        ":hover, &[data-active]": {
            border: "none",
            backgroundColor: theme.colors.white[0],

            p: {
                color: theme.colors.dark[0],
            },
        },
    },
    tabLabel: {
        padding: "12px 27px",
        display: "flex",
        alignItems: "center",
        fontSize: 16,
        lineHeight: "24px",
    },
}));