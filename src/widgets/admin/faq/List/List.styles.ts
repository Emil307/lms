import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 24,
        paddingBottom: 32,
        gap: 8,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],

        [theme.fn.smallerThan("sm")]: {
            padding: 0,
            backgroundColor: "inherit",
        },
    },
    buttonAddQuestion: {
        alignSelf: "center",
        width: "100%",
        maxWidth: 249,
        height: 56,
        marginTop: 24,
    },
}));
