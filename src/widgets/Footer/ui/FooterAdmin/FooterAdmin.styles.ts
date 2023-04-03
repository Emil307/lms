import { createStyles } from "@mantine/core";

export const useFooterAdminStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "inherit",
        borderTop: "none",
        padding: 0,
        paddingLeft: 24,
        position: "static",
        maxHeight: 192,
        marginTop: 32,
    },
    inner: {
        height: 136,
        backgroundColor: theme.colors.white[0],
        padding: "32px 24px",
        borderRadius: 24,

        a: {
            textDecoration: "none",
            color: theme.colors.dark[0],
        },
    },
}));