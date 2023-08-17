import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },
    headingContainer: {
        flexDirection: "column",
        gap: 24,
    },
    wrapperInfoList: {
        flexWrap: "wrap",
        columnGap: 56,
        rowGap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
