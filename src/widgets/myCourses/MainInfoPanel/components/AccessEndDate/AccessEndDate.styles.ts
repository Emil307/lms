import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapperIcon: {
        width: 24,
        height: 24,
        minWidth: 24,
        minHeight: 24,

        svg: {
            transform: "scale(1.5)",

            path: {
                fill: theme.colors.secondaryHover[0],
            },
        },
    },
}));
