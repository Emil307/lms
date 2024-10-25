import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    titleIcon: {
        color: theme.colors.primaryHover[0],

        svg: {
            width: 32,
            height: 32,
        },

        [theme.fn.smallerThan("md")]: {
            svg: {
                width: 24,
                height: 24,
            },
        },
    },

    content: {
        borderRadius: 24,
        backgroundColor: theme.colors.neutralWhite[0],
    },
}));
