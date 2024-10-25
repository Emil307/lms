import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        borderRadius: 16,
        padding: 8,
        backgroundColor: theme.colors.neutralGray100[0],
    },
    heading: {
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        cursor: "pointer",
    },
    headingRight: {
        gap: 16,
        alignItems: "center",
    },
}));
