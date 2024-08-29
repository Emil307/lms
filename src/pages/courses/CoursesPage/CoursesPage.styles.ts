import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    filtersBlock: {
        [theme.fn.smallerThan("md")]: {
            padding: "0 16px",
        },
    },
    coursesBlock: {
        [theme.fn.smallerThan("md")]: {
            padding: "0 16px",
        },
    },
    drawer: {
        borderBottomLeftRadius: 32,
        borderTopLeftRadius: 32,

        [theme.fn.smallerThan("xs")]: {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
        },
    },
    button: {
        span: {
            display: "flex",
            alignItems: "center",
            gap: 8,
        },
    },
    searchInput: {
        width: "100%",
        border: `1px solid ${theme.colors.neutral_gray300[0]}`,
        borderRadius: 12,
        "& input": {
            backgroundColor: "transparent",
            border: "none",
            "&:hover, &:focus": {
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
            },
        },
    },
    resetButton: {
        borderRadius: 56,
        minWidth: 76,
        minHeight: 48,
        padding: "12px 24px",
        fontSize: 16,
        fontWeight: 500,
        height: "48px",
        // lineHeight: "24px",
        border: `1px solid ${theme.colors.neutral_main50[0]}`,
        backgroundColor: `${theme.colors.white} !important`,
        ":hover": {
            color: theme.colors.dark[0],
        },
    },
}));
