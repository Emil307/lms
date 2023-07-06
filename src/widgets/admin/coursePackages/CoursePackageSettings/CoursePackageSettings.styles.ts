import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    info: {
        display: "grid",
        gridTemplateColumns: "1fr 334px",
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
}));
