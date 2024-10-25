import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    socialLinkInner: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: 56,
        color: theme.colors.neutralWhite[0],
        backgroundColor: theme.colors.dark[0],

        svg: {
            height: 18,
            width: 18,
        },

        ":hover": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.secondary[0],
        },
    },
    tgLink: {
        textDecoration: "none",
    },
    email: {
        lineHeight: "24px",
    },
    buttonIcon: {
        width: 56,
        height: 56,
        backgroundColor: theme.colors.neutralGray100[0],
        borderRadius: 56,

        svg: {
            color: theme.colors.dark[0],
            width: 24,
            height: 24,
        },

        "&:hover": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    emailAndPhone: {
        flexDirection: "column",
        gap: 8,
    },
}));
