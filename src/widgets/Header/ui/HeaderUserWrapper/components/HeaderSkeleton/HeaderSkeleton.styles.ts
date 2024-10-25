import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.neutralWhite[0],
        position: "sticky",
        maxHeight: HEADER_HEIGHT,
        top: 0,
        left: 0,
        paddingInline: 16,
        borderBottom: `1px solid ${theme.colors.neutralGray200[0]}`,
        zIndex: 399,
    },
    inner: {
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1728,
        minHeight: 96,
        marginInline: "auto",

        [theme.fn.smallerThan("md")]: {
            minHeight: 74,
        },
    },
    left: {
        width: 570,
        height: 38,
        borderRadius: 56,

        [theme.fn.smallerThan("md")]: {
            width: 480,
            height: 40,
        },

        [theme.fn.smallerThan("sm")]: {
            width: 72,
            height: 20,
        },
    },
    right: {
        width: 400,
        height: 56,
        borderRadius: 56,

        [theme.fn.smallerThan("md")]: {
            width: 160,
            height: 48,
        },
    },
}));
