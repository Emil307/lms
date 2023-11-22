import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    heading: {
        gap: 48,
        alignItems: "center",
        marginBottom: 32,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
}));
