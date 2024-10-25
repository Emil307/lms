import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 1,
        width: "100%",
        padding: 4,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],
    },
}));
