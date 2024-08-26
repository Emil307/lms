import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        gap: 64,

        [theme.fn.smallerThan("md")]: {
            gap: 48,
        },
    },
    requisitesWrapper: {
        flexDirection: "column",
        gap: 24,
        marginTop: 112,

        [theme.fn.smallerThan("sm")]: {
            marginTop: 96,
        },
    },
}));
