import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapperAlertIcon: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: 48,
        width: 48,
        height: 48,
        background: theme.colors.secondary16[0],
        color: theme.colors.secondary[0],
        svg: {
            color: theme.colors.secondary[0],
        },
    },
}));
