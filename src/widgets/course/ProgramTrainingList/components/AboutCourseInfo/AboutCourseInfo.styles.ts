import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexWrap: "wrap",
        alignItems: "center",
        padding: "24px 32px",
        borderRadius: 16,
        columnGap: 56,
        rowGap: 24,
        backgroundColor: theme.colors.neutralGray200[0],

        [theme.fn.smallerThan("sm")]: {
            padding: 24,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
    aboutInfoList: {
        flexWrap: "wrap",
        columnGap: 56,
        rowGap: 24,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
