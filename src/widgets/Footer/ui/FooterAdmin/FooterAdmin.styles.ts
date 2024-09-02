import { createStyles } from "@mantine/core";
import { ADMIN_FOOTER_HEIGHT } from "@shared/constant";

export const useFooterAdminStyles = createStyles((theme) => ({
    root: {
        position: "static",
        maxHeight: ADMIN_FOOTER_HEIGHT,
        padding: 0,
        paddingTop: 32,
        paddingInline: 24,
        border: "none",
        backgroundColor: "inherit",

        [theme.fn.smallerThan("md")]: {
            paddingTop: 24,
        },
    },
    inner: {
        alignItems: "center",
        justifyContent: "space-between",
        height: 136,
        padding: "32px 24px",
        marginBottom: 8,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],

        a: {
            textDecoration: "none",
            color: theme.colors.dark[0],
        },

        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },
    socialLink: {
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        width: 56,
        borderRadius: 56,
        color: theme.colors.white[0],
        backgroundColor: theme.colors.dark[0],

        svg: {
            width: 24,
            height: 24,
        },

        ":hover": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.done[0],
        },
    },
    companyName: {
        height: 48,
        paddingBlock: 16,
        textAlign: "center",
    },
}));
