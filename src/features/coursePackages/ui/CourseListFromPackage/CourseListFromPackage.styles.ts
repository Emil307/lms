import { createStyles } from "@mantine/core";

export default createStyles((theme, { isOpen }: { isOpen: boolean }) => ({
    root: {},
    content: {
        overflow: isOpen ? "auto" : "hidden",
        "> div": {
            maxHeight: 117,
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
}));
