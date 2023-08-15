import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    filterWrapper: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },
    filterSearchAndSelects: {
        flexWrap: "wrap",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    filterSearch: {
        width: 210,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    filterSelect: {
        width: 210,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    filterDateRangePicker: {
        width: 210,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));
