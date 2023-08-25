import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    filterWrapper: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },
    filterDatePickerAndSelects: {
        flexWrap: "wrap",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    filterDateRangePicker: {
        width: 252,

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
    buttons: {
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    button: {
        width: 164,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));
