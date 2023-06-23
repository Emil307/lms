import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralLight[0],
    },
    lessonDescription: {
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.neutral_gray[0],
        margin: "16px 0",
    },
    label: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 600,
    },
    labelValue: {
        fontWeight: 500,
    },
    icon: {
        minWidth: 24,
        minHeight: 24,
    },
    videoEmptyDescription: {
        fontSize: 14,
        lineHeight: "16px",
        marginTop: 8,
        color: theme.colors.neutral_gray[0],
    },
    moduleName: {
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 500,
    },
    emptyContentTitle: {
        color: theme.colors.neutral_gray[0],
    },
}));
