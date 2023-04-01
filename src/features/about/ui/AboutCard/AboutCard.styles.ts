import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: "32px !important",
        gap: 48,
        borderRadius: 16,

        ".mantine-Card-cardSection": {
            margin: 0,
        },
    },
    imageSection: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 420,
        marginTop: "0 !important",
        borderRadius: 16,
    },
    contentSection: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: "0 !important",
    },
    shortContent: {
        maxWidth: 604,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
}));
