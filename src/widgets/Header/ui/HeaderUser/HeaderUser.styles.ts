import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "static",
    },
    inner: {
        justifyContent: "space-between",
        maxWidth: 1320,
        minHeight: 96,
        marginInline: "auto",
        paddingInline: 16,
    },
}));
