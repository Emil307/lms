import { createStyles } from "@mantine/core";

export default createStyles((theme, { isOpen }: { isOpen: boolean }) => ({
    root: {},
    content: {
        overflow: isOpen ? "auto" : "hidden",
        "> div": {
            maxHeight: 128,
            width: "100%",
        },
    },
    spoilerLabelText: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
}));
