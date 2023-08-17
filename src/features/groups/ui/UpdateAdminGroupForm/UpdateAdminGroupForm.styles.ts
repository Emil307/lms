import { createStyles, MantineTheme } from "@mantine/core";

export default createStyles((theme) => ({
    infoPanel: {
        alignItems: "center",
        gap: 32,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("lg")]: {
            flexDirection: "row",
            width: "100%",
            gap: 24,
            overflowX: "auto",
        },
    },
    status: {
        width: "min-content",
        borderRadius: 32,
        ...getColorsByStatus(theme, { status }),
    },
    actions: {
        gap: 8,

        button: {
            width: "100%",
            maxWidth: 252,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",

            button: {
                maxWidth: "none",
            },
        },
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: { status?: string }) => {
    switch (status) {
        case "notStarted":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };
        case "done":
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
        default:
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };
    }
};
