import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        margin: 0,
        padding: 0,
        gap: 7.5,
        border: "none",
    },
    legend: {
        display: "flex",
        gap: 16,
        marginBottom: 24,

        svg: {
            color: "gray45.0",
        },
    },
    coverFileInput: {
        height: 308,
        width: "100%",
        maxWidth: 512,

        [theme.fn.smallerThan("xs")]: {
            height: 129,
        },
    },
    priceInput: {
        width: "100%",
        maxWidth: 252,

        [theme.fn.smallerThan("xs")]: {
            maxWidth: "none",
        },
    },
    textEditorDescription: {
        maxWidth: 1162,
        height: 320,

        [theme.fn.smallerThan("xs")]: {
            height: 500,
        },
    },
    discountTypeRadioGroup: {
        [theme.fn.smallerThan("sm")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
        },
    },
    discountFieldsContainer: {
        flexWrap: "wrap",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    discountInput: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    discountDateRangePicker: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));
