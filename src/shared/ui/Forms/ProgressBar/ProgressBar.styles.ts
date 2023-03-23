import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        columnGap: 16,
    },
    root: {
        height: 12,
        borderRadius: 16,
    },
    bar: {
        borderRadius: "16px !important",
        backgroundColor: theme.colors.dark[0],
    },
}));
