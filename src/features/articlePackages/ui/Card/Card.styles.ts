import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 32,
        height: "100%",
        padding: 24,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    contentSectionWrapper: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
    },
}));
