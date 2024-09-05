import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    filtersBlock: {
        [theme.fn.smallerThan("md")]: {
            padding: "0 16px",
        },
    },
    header: {
        fontSize: 56,
        lineHeight: "62px",
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
    filters: {
        flexDirection: "column",
        gap: 64,
        marginBottom: 36,

        [theme.fn.smallerThan("xs")]: {
            gap: 48,
        },
    },
    buttonsWrapper: {
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
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
            height: 32,
            padding: "0px 36px 0px 40px",
            ":hover, :focus": {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
            },
        },
    },
    searchButton: {
        fontSize: 18,
        padding: "16px 32px",
        height: "100%",
    },
    resetButton: {
        borderRadius: 56,
        minWidth: 76,
        padding: "12px 24px",
        fontSize: 16,
        fontWeight: 500,
        height: "48px",
        border: `1px solid ${theme.colors.neutral_main50[0]}`,
        backgroundColor: `${theme.colors.white} !important`,
        ":hover": {
            color: theme.colors.dark[0],
        },
    },
}));
