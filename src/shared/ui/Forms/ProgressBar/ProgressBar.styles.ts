import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    hiddenLabel: boolean;
}

export default createStyles((theme, { hiddenLabel }: CreateStylesParams) => ({
    wrapper: {
        display: "grid",
        gridTemplateColumns: hiddenLabel ? "1fr" : "1fr auto",
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
