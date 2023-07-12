import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 32,
    },

    socialLinkInner: {
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        width: 56,
        borderRadius: 8,
        backgroundColor: theme.colors.primary[0],

        ":hover": {
            backgroundColor: theme.colors.primaryHover[0],
        },
    },
}));
