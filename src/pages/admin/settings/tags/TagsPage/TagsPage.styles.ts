import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    headingContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 24,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 32,
        },
    },
}));
