import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 56,
        lineHeight: "62px",
        fontWeight: 600,
        marginBottom: 64,
        [theme.fn.smallerThan("sm")]: {
            marginBottom: 48,
            padding: "0px 16px",
        },
    },
    breadCrumbs: {
        [theme.fn.smallerThan("sm")]: {
            padding: "0px 16px",
        },
    },
    collectionsWrapper: {
        [theme.fn.smallerThan("sm")]: {
            padding: "0px 4px",
        },
    },
}));
