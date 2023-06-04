import { createStyles } from "@mantine/core";

export const useCountDataStyles = createStyles((theme) => ({
    wrapper: {
        color: theme.colors.gray45[0],
        lineHeight: "16px",
        fontWeight: 500,
        span: {
            color: theme.colors.dark[0],
        },
        marginTop: "32px",
    },
}));
