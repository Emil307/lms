import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    advantageItem: {
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        minHeight: 160,
        paddingBlock: 32,
        paddingInline: 16,
        gap: 8,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
        textAlign: "center",

        [theme.fn.smallerThan("sm")]: {
            paddingBlock: 16
        },
    },
}));
