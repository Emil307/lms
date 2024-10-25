import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 4,
    },
    tag: {
        borderRadius: 8,
        backgroundColor: theme.colors.neutralGray100[0],
        color: theme.colors.neutralMain50[0],
    },
}));
