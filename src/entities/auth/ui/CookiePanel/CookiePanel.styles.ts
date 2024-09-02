import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "fixed",
        maxWidth: 765,
        width: "calc(100% - 32px)",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        backgroundColor: theme.colors.dark[0],
        padding: 24,
        borderRadius: 16,
        zIndex: 101,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            bottom: 16,
        },
    },
}));
