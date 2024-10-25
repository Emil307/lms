import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 32,
    },
    blocksWrapper: {
        gap: 64,
        [theme.fn.smallerThan("md")]: {
            gap: 48,
        },
    },
    mainInfoWrapper: {
        paddingRight: 0,
        paddingLeft: 0,
        [theme.fn.smallerThan("md")]: {
            paddingRight: 16,
            paddingLeft: 16,
        },
    },
    reviewInfo: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    title: {
        fontSize: 42,
        lineHeight: "46px",
    },
    reviews: {
        color: theme.colors.neutralMain50[0],
    },
    description: {
        table: {
            "td, th, tr:last-of-type td": {
                border: "none",
            },
        },
    },
}));
