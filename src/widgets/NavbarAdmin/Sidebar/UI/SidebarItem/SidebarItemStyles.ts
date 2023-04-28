import { createStyles } from "@mantine/core";

export const useSidebarStyles = createStyles((theme, { isActive, inner }: { isActive?: boolean; inner?: boolean }) => ({
    wrapper: {
        cursor: "pointer",
        color: isActive ? theme.colors.dark[0] : theme.colors.gray45[0],
        "&:hover": {
            color: theme.colors.dark[0],
        },
    },
    indicator: {
        width: "10px",
        height: "30px",
        borderTopRightRadius: "99px",
        borderBottomRightRadius: "99px",
        backgroundColor: isActive ? "orange" : "transparent",
        padding: 0,
    },
    name: {
        padding: 12,
    },
    text: {
        fontWeight: 600,
        fontSize: inner ? 14 : 16,
        lineHeight: "24px",
    },
}));
