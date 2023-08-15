import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    headingContainer: {
        alignItems: "center",
        gap: 48,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
            gap: 16,
        },
    },
}));
