import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralLight[0],
    },
    buttonAdd: {
        borderRadius: 160,
    },
    error: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        marginTop: 8,
        color: theme.colors.warning[0],
    },
}));
