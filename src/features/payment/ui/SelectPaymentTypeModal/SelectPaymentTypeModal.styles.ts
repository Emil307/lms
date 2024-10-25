import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    divider: {
        flexGrow: 1,
        height: 1,
        backgroundColor: theme.colors.neutralMain50[0],
    },
    paymentTypesContainer: {
        flexDirection: "column",
        gap: 8,
    },
}));
