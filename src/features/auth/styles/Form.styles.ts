import { createStyles } from "@mantine/core";

export const useFormStyles = createStyles((theme) => ({
    root: {
        height: "100%",
        paddingRight: 20,
    },
    inner: {
        height: "100%",
        flexDirection: "column",
        gap: 24,
        flexGrow: 1,
        overflowY: "auto",
        paddingBottom: 92,
    },
    link: {
        color: theme.colors.primary[0],
        textDecoration: "initial",
    },
    recoveryPasswordLink: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        textDecoration: "none",
        cursor: "pointer",
    },
    rememberPassword: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    signUpButton: {
        width: 117,
        fontSize: 18,
        height: 56,
        lineHeight: "24px",
        padding: "16px 32px",
        backgroundColor: "#F5F5F5",
        borderRadius: 56,
        textDecoration: "none",
        color: theme.colors.dark[0],
    },
    signInButton: {
        borderRadius: 56,
        minWidth: 117,
        minHeight: 56,
        padding: "16px 32px",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: "24px",
    },
    recoveryButton: {
        borderRadius: 56,
        width: 114,
        minHeight: 48,
        padding: "12px 24px",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: "24px",
    },
    form: {
        height: "100%",
    },
    createUserText: {
        fontSize: 16,
        lineHeight: "22px",
    },
    linkButton: {
        display: "flex",
        justifyContent: "center",
        textDecoration: "none",
    },
    absoluteButton: {
        left: "50%",
        transform: "translate(-50%)",
    },
    buttonsWrapper: {
        width: "100%",
    },
}));
