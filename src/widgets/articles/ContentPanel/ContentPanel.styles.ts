import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: "48px 24px 56px",
        gap: 48,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("sm")]: {
            paddingTop: 24,
        },
    },
}));
