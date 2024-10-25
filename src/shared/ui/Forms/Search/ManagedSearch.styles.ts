import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    nothingFound: {
        paddingBlock: 20,
        color: theme.colors.neutralMain50[0],
        textAlign: "center",
    },
    dropdownContainer: {
        backgroundColor: theme.colors.neutralWhite[0],
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
        borderRadius: 8,
    },
}));
