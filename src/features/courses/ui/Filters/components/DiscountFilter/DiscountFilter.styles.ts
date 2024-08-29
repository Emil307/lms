import { createStyles } from "@mantine/core";

export default createStyles((theme, isActive: boolean) => ({
    root: {
        width: "fit-content",
        paddingBlock: 12,
        paddingInline: 16,
        borderRadius: 12,
        backgroundColor: isActive ? theme.colors.dark[0] : theme.colors.white[0],
        cursor: "pointer",
        border: `1px solid ${theme.colors.dark[0]}`,
    },
    content: {
        color: isActive ? theme.colors.white[0] : theme.colors.dark[0],

        [theme.fn.smallerThan("md")]: {
            whiteSpace: "nowrap",
        },
    },
}));
