import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    mainInfoWrapper: {
        paddingRight: 0,
        paddingLeft: 0,
        [theme.fn.smallerThan("md")]: {
            paddingRight: 16,
            paddingLeft: 16,
        },
    },
    description: {
        table: {
            "td, th, tr:last-of-type td": {
                border: "none",
            },
        },
    },
}));
