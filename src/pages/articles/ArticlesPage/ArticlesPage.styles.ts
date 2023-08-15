import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapperContent: {
        flexDirection: "column",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            gap: 16,
        },
    },
    headingContainer: {
        alignItems: "center",
        gap: 12,
    },
    headingIcon: {
        height: 32,
        width: 32,
        color: theme.colors.primaryHover[0],

        [theme.fn.smallerThan("md")]: {
            height: 24,
            width: 24,
        },
    },
}));
