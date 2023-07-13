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
        maxWidth: 264,
        alignSelf: "self-end",

        [theme.fn.smallerThan("xs")]: {
            maxWidth: "none",
        },
    },
    content: {
        gap: 40,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
            gap: 48,
        },
    },
    wrapperFiltersBlock: {
        width: "100%",
    },
    filtersBlock: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 264,
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
        justifyContent: "center",
        gap: 8,

        [theme.fn.smallerThan("md")]: {
            justifyContent: "flex-start",
        },
    },
}));
