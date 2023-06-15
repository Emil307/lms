import { createStyles } from "@mantine/core";

export const useSelectedRowsCountStyles = createStyles((theme) => ({
    wrapper: {
        color: theme.colors.gray45[0],
        lineHeight: "16px",
        fontWeight: 500,
        marginTop: 32,
        span: {
            color: theme.colors.dark[0],
        },
    },
}));
