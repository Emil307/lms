import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    controls: {
        top: "auto",
        bottom: 48,
        left: 48,
        width: "fit-content",
        padding: 0,
    },
    control: {
        width: 56,
        height: 56,
        borderRadius: 48,
        border: "none",
        color: theme.colors.dark[0],
        opacity: 1,

        ":hover": {
            color: theme.colors.secondary[0],
        },
    },
    wrapper: {
        position: "relative",
        flexDirection: "column",
        gap: 32,
    },
}));
