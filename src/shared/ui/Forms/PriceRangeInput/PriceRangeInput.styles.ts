import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    priceInput: {
        width: "100%",
        input: {
            width: "100%",
            height: 56,
            borderRadius: 8,
            border: `1px solid ${theme.colors.neutralGray300[0]}`,
        },
    },
}));
