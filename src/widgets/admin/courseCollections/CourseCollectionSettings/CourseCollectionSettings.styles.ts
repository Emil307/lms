import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    info: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 1162px) 334px",
        gridGap: 56,
        alignItems: "flex-start",

        [theme.fn.smallerThan("md")]: {
            gridTemplateColumns: "100%",

            "> div": {
                "&:last-child": {
                    maxWidth: 334,
                    width: "100%",
                    order: -1,
                },
            },
        },
    },
    settingsInfo: {
        flexDirection: "column",
        minWidth: 400,
        flex: 1,
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            minWidth: "auto",
        },
    },

    headingSettingsInfo: {
        alignItems: "center",
        gap: 48,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
            gap: 16,
        },
    },
}));
