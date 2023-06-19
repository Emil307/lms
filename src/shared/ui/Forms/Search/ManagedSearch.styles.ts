import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    nothingFound: {
        paddingBlock: 20,
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        textAlign: "center",
    },
    dropdownContainer: {
        backgroundColor: theme.colors.white[0],
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
        borderRadius: 8,
    },
}));
