import { createStyles } from "@mantine/core";

export const useFormStyles = createStyles((theme) => ({
    root: {
        height: "100%",
        paddingRight: 20,
    },
    contentWrapper: {
        height: "100%",
        paddingBottom: 92,
        flexDirection: "column",
        [theme.fn.smallerThan("md")]: {
            paddingBottom: 0,
            paddingRight: 0,
            justifyContent: "space-between",
        },
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
    recoveryButton: {
        borderRadius: 56,
        width: 138,
        minHeight: 56,
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
