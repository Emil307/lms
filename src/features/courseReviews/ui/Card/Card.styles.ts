import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px 40px !important",
        gap: 32,
        borderRadius: 35,
        height: "100%",
        backgroundColor: theme.colors.neutralWhite[0],
        border: `1px solid ${theme.colors.neutralGray200[0]}`,
        "&.activeSlide": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    section: {
        display: "flex",
        flexDirection: "column",
        margin: "0px !important",
        gap: 16,

        ".mantine-Spoiler-control": {
            position: "absolute",
            right: 0,
            bottom: 0,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "24px",
            color: theme.colors.dark[0],
        },
    },

    rating: {
        alignItems: "center",
        alignSelf: "self-start",
        gap: 4,

        [theme.fn.smallerThan("xs")]: {
            marginLeft: 0,
        },
    },
    description: {
        overflowY: "auto",
        height: 280,
        [theme.fn.smallerThan("sm")]: {
            height: 300,
        },
    },
    courseName: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
}));
