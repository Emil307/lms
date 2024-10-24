import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 56,
        lineHeight: "62px",
        fontWeight: 600,
    },
    courseWrapper: {
        gap: 64,
        [theme.fn.smallerThan("sm")]: {
            gap: 48,
        },
    },
    container: {
        maxWidth: 1320,
        margin: "auto",
    },
    breadCrumbs: {
        [theme.fn.smallerThan("sm")]: {
            padding: "0px 16px",
        },
    },
    heading: {
        [theme.fn.smallerThan("sm")]: {
            padding: "0px 16px",
        },
    },
    courseList: {
        [theme.fn.smallerThan("sm")]: {
            padding: "0px 4px",
        },
    },
}));
