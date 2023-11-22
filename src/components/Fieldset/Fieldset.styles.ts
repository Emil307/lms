import { createStyles } from "@mantine/core";

export default createStyles((theme, { isOpen }: { isOpen: boolean }) => ({
    root: {
        flexDirection: "column",
    },

    headingContainer: {
        gap: 16,
        marginBottom: isOpen ? 16 : 0,

        svg: {
            color: theme.colors.gray45[0],
        },
    },
    item: {
        width: "100%",
        wordBreak: "break-word",
    },
}));
