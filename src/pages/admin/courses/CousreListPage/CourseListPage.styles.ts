import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    headingContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 24,
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 32,
        },
    },
}));
