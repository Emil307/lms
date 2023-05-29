import { createStyles } from "@mantine/core";

export default createStyles((theme, { isOpen }: { isOpen: boolean }) => ({
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
    spoilerLabelText: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    filterName: {
        marginBottom: 16,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
    resetButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        fontSize: 14,
        lineHeight: "24px",
        textDecoration: "underline",

        "&:hover": {
            textDecoration: "none",
        },
    },
}));
