import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isSelected?: boolean;
}

export default createStyles((theme, { isSelected }: CreateStylesParams) => ({
    root: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: 78,
        height: 78,
        padding: 15,
        border: isSelected ? `2px solid ${theme.colors.grayLight[0]}` : "none",
        borderRadius: 8,
        backgroundColor: isSelected ? theme.colors.light[0] : theme.colors.white[0],
        color: theme.colors.secondary[0],
        cursor: "pointer",

        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    wrapperCheckIcon: {
        position: "absolute",
        top: 8,
        left: 8,
        borderRadius: 24,
        backgroundColor: theme.colors.done[0],
        color: theme.colors.white[0],

        svg: {
            transform: "scale(0.7)",
            strokeWidth: 3,
        },
    },
}));
