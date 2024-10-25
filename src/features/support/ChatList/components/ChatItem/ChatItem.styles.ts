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
        backgroundColor: isSelected ? theme.colors.secondary8[0] : theme.colors.neutralWhite[0],
        cursor: "pointer",

        ":hover": {
            backgroundColor: theme.colors.neutralGray100[0],
        },
    },
    avatarWrapper: {
        width: 32,
        minWidth: 32,
        height: 32,
        borderRadius: 160,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    avatarDefaultIconWrapper: {
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
        color: isSelected ? theme.colors.primaryHover[0] : theme.colors.dark[0],
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    createdAtLastMessage: {
        whiteSpace: "nowrap",
    },
    lastMesssageContent: {
        color: isSelected ? theme.colors.dark[0] : theme.colors.neutralMain50[0],
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    textWrapper: {
        display: "table",
        width: "fit-content",
        tableLayout: "fixed",
    },
}));
