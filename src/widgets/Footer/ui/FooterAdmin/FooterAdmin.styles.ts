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
    link: {
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
    companyName: {
        height: 48,
        paddingBlock: 16,
        textAlign: "center",
    },
}));
