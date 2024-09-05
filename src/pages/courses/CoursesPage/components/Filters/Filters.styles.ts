import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapperTitle: {
        justifyContent: "space-between",
        marginBottom: 32,
        gap: 32,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            marginBottom: 24,
        },
    },
    titleSearch: {
        width: "100%",
        alignSelf: "self-end",

        [theme.fn.smallerThan("xs")]: {
            maxWidth: "none",
        },
    },
    content: {
        flexDirection: "column",
        maxHeight: "70svh",
        overflowY: "auto",
        gap: 40,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
            maxHeight: "60svh",
        },
    },
    wrapperFiltersBlock: {
        width: "100%",
    },
    filtersBlock: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxHeight: 912,
        overflowY: "auto",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            maxWidth: "none",
            gap: 24,
        },
    },

    filtersBlockCollapseInner: {
        flexDirection: "column",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            width: "100%",
            maxWidth: 420,
        },
    },

    buttonsFormContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 402,
        position: "absolute",
        bottom: 24,
        left: 24,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "calc(100svw - 36px)",
            justifyContent: "space-between",
        },
    },
    searchButton: {
        borderRadius: 56,
        minWidth: 117,
        minHeight: 56,
        padding: "16px 32px",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: "24px",
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.white,
    },
    resetButton: {
        borderRadius: 56,
        minWidth: 117,
        minHeight: 56,
        padding: "16px 32px",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: "24px",
    },
}));
