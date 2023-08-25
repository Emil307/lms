import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapperFiltersBlock: {
        width: "100%",
    },

    filtersBlock: {
        display: "flex",
        flexDirection: "column",
        gap: 32,
        width: 264,

        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            gap: 24,
        },

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
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
        width: "100%",

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
