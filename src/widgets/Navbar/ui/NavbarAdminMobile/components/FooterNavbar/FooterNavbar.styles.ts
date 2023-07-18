import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        paddingInline: 16,
        gap: 32,
        backgroundColor: theme.colors.light[0],
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
