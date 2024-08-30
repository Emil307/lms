import { createStyles } from "@mantine/core";

export const useFormStyles = createStyles((theme) => ({
    root: {
        height: "95%",
        overflow: "auto",
        paddingRight: 20,
        [theme.fn.smallerThan("md")]: {
            height: "80%",
        },
    },
    inner: {
        flexDirection: "column",
        alignItems: "left",
        gap: 24,
        height: "100%",
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
        backgroundColor: "#F5F5F5",
        borderRadius: 56,
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
    form: {
        height: "100%",
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
}));
