import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isSelected: boolean;
}

export default createStyles((theme, { isSelected }: CreateStylesProps) => ({
    root: {
        alignItems: "center",
        gap: 8,
        padding: 12,
        borderRadius: 8,
        cursor: "pointer",
        backgroundColor: isSelected ? theme.colors.primary16[0] : "transparent",

        ":hover": {
            backgroundColor: theme.colors.primary8[0],
        },
    },
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.65)",
        },
    },
}));
