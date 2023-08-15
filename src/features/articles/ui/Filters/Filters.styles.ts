import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        minWidth: 264,
        gap: 32,
    },

    wrapperFiltersBlock: {
        width: "100%",
    },

    filtersBlock: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
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
    searchFilter: {
        width: 264,

        [theme.fn.smallerThan("md")]: {
            width: "100%",
            maxWidth: 343,
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
