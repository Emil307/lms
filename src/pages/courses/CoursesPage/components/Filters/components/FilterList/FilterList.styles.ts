import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isOpen: boolean;
    hasSpoiler: boolean;
}

export default createStyles((theme, { isOpen, hasSpoiler }: CreateStylesProps) => ({
    root: {},
    content: {
        overflow: isOpen ? "auto" : "hidden",

        borderBottom: isOpen ? `1px solid ${theme.colors.gray20[0]}` : "none",

        "> div": {
            maxHeight: 272,
            width: "100%",
        },
    },
    control: {
        marginTop: 16,
    },

    filterContainer: {
        flexDirection: "column",
        position: "relative",
        gap: 16,
    },
    resetButton: {
        position: hasSpoiler ? "absolute" : "static",
        alignSelf: "flex-end",
        bottom: 0,
        right: 0,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "24px",
        textDecoration: "underline",

        "&:hover": {
            textDecoration: "none",
        },
    },
}));