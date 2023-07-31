import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    actionIconBack: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 8,
        border: `2px solid ${theme.colors.gray20[0]}`,

        svg: {
            color: theme.colors.gray45[0],
        },
    },
    progressBarWrapper: {
        flex: 1,
    },
}));
