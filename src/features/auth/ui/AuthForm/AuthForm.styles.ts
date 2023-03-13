import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "relative",
        padding: 24,
        paddingTop: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white,
    },
    inner: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        form: {
            width: "100%",
            border: "none",
            padding: 0,
        },
    },
    headingTitle: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.dark,
        textAlign: "center",
    },
    headingDescription: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark,
    },
    signUpLink: {
        marginLeft: 8,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.primary,
    },
    recoveryPasswordLink: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark,
    },
    buttonBack: {
        position: "absolute",
        width: 56,
        height: 56,
        left: -28,
        top: 40,
        padding: 0,
        borderRadius: "50%",
        filter: " drop-shadow(0px 1px 2px rgba(0, 18, 110, 0.04)) drop-shadow(0px 0px 16px rgba(0, 18, 110, 0.04));",
    },
}));
