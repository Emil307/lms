import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isSelected: boolean;
}

export default createStyles((theme, { isSelected }: CreateStylesProps) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        paddingTop: 24,
        gap: 8,
        borderRadius: 8,
        backgroundColor: isSelected ? theme.colors.secondary8[0] : theme.colors.white[0],
        cursor: "pointer",

        ":hover": {
            backgroundColor: theme.colors.light[0],
        },
    },
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.4)",
        },
    },
    userInfo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
    },
    userFullName: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: isSelected ? theme.colors.primaryHover[0] : theme.colors.dark[0],
    },
    createdAtLastMessage: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        whiteSpace: "nowrap",
    },
    lastMesssageContent: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: isSelected ? theme.colors.dark[0] : theme.colors.gray45[0],
    },
}));
