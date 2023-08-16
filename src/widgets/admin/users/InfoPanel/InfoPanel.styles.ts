import { createStyles } from "@mantine/core";

export const useInfoPanelStyles = createStyles((theme) => ({
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

        [theme.fn.smallerThan("md")]: {
            gap: 24,
        },
    },
    checkboxStatic: {
        ".mantine-Checkbox-label": {
            whiteSpace: "nowrap",
        },
    },
}));
