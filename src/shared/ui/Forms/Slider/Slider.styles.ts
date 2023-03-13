import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    label: {
        width: 24,
        height: 24,
        top: -34,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
        fontSize: 0,

        svg: {
            width: "14px !important",
            height: "14px !important",
        },
    },
}));
