import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralLight[0],
    },
    lessonDescription: {
        margin: "16px 0",
    },
    icon: {
        minWidth: 24,
        minHeight: 24,
    },
    button: {
        borderRadius: 160,
    },
}));
