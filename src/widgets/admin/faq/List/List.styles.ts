import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: 24,
        paddingBottom: 32,
        gap: 20,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],
    },
    buttonAddQuestion: {
        alignSelf: "center",
        width: "100%",
        maxWidth: 249,
        height: 56,
    },
}));
