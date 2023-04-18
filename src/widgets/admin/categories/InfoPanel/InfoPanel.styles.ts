import { createStyles } from "@mantine/core";

export const useInfoPanelStyles = createStyles((theme) => ({
    infoItem: {
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        span: {
            color: theme.colors.dark[0],
        },
    },
}));
