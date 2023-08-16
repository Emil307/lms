import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    iconToggle: {
        height: 24,
        width: 24,
        minHeight: 24,
        minWidth: 24,
        borderRadius: 24,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.dark[0],
        ":hover": {
            backgroundColor: theme.colors.secondary8[0],
        },

        svg: {
            width: 9,
            color: theme.colors.secondaryHover[0],
            strokeWidth: 5,
        },
    },
    filter: {
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
