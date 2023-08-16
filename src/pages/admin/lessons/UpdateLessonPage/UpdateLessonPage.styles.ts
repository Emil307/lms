import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    heading: {
        alignItems: "center",
        marginBottom: 32,
        gap: 48,

        [theme.fn.smallerThan("sm")]: {
            marginBottom: 24,
        },
    },
}));
