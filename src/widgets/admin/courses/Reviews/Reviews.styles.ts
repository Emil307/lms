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
        width: 512,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    filterSelect: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    filterDateRangePicker: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    filterRadioGroup: {
        [theme.fn.smallerThan("sm")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
        },
    },
}));
