import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    warning: {
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
        fontWeight: 500,
        minWidth: 48,
        height: 48,
    },
    questionName: {
        display: "inline",
    },
}));
