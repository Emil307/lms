import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isActive: boolean;
    expanded: boolean;
}

export default createStyles((theme, { isActive, expanded }: CreateStylesProps) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 16,
        backgroundColor: isActive ? theme.colors.white[0] : theme.colors.light[0],
        cursor: "pointer",

        ...(isActive && {
            boxShadow: expanded
                ? "0px 16px 32px rgba(2, 6, 46, 0.08)"
                : "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        }),

        [theme.fn.smallerThan("sm")]: {
            padding: 16,
        },
    },
    title: {
        color: isActive ? theme.colors.dark[0] : theme.colors.gray45[0],
    },
    actionIcon: {
        width: 40,
        height: 40,
        cursor: "grab",
    },
    textContent: {
        marginTop: 32,

        [theme.fn.smallerThan("sm")]: {
            marginTop: 16,
        },
    },
    hidden: {
        display: "none",
    },
}));
