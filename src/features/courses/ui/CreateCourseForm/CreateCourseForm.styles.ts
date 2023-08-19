import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        gap: 32,
        overflowX: "auto",
        alignItems: "center",

        "::-webkit-scrollbar": {
            display: "none",
        },
    },
    item: {
        gap: 8,
        alignItems: "center",
        whiteSpace: "nowrap",
    },
    imageInputWrapper: {
        [theme.fn.smallerThan("xs")]: {
            position: "relative",
            paddingTop: "61%",
        },
    },
    imageInput: {
        maxWidth: 512,
        width: "100%",
        height: 308,

        [theme.fn.smallerThan("xs")]: {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
        },
    },
    cost: {
        width: "100%",
        gap: 21,
        alignItems: "center",

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
        },
    },
    costInput: {
        width: 252,

        [theme.fn.smallerThan("sm")]: {
            width: "100%",
        },
    },
    discount: {
        gap: 8,
        width: "100%",
        marginTop: 8,
        flexWrap: "wrap",
    },
    discountRadio: {
        [theme.fn.smallerThan("xs")]: {
            ".mantine-Group-root": {
                flexDirection: "column",
            },
        },
    },
    discountItem: {
        width: 252,

        [theme.fn.smallerThan("sm")]: {
            width: "100%",
        },
    },
    buttons: {
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    button: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));
