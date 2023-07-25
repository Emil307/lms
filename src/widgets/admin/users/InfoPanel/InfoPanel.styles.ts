import { createStyles } from "@mantine/core";

export const useInfoPanelStyles = createStyles((_theme) => ({
    infoPanelListInfo: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        gap: 32,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },
    },
}));
