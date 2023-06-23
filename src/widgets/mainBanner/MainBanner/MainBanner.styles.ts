import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "relative",
        overflow: "hidden",
        height: 576,
        borderRadius: 24,
    },

    imageWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",

        "&::after": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            content: '""',
            background:
                "linear-gradient(0deg, rgba(2, 6, 46, 0.2), rgba(2, 6, 46, 0.2)), linear-gradient(90.07deg, rgba(0, 0, 0, 0.1) 0.06%, rgba(0, 0, 0, 0) 42.63%)",
        },
    },

    wrapperContent: {
        position: "relative",
        height: "100%",
        width: "100%",
    },

    headerContent: {
        flexDirection: "column",
        maxWidth: 743,
        gap: 56,
        marginLeft: 96,
        marginBlock: "auto",
    },

    title: {
        fontWeight: 700,
        fontSize: 56,
        lineHeight: "62px",
        color: theme.colors.white[0],
    },
    subtitle: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.white[0],
    },

    authorContent: {
        position: "absolute",
        flexDirection: "column",
        height: "min-content",
        maxWidth: 255,
        top: 348,
        right: 110,
        gap: 10,
        padding: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.white16[0],
        backdropFilter: "blur(30px)",
        transform: "rotate(3deg)",
    },

    authorShortQuote: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.white[0],
    },
    authorFullName: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.white[0],
    },
    authorAbout: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.white56[0],
    },
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.4)",
        },
    },
}));
