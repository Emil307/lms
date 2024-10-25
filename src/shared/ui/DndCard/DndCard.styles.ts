import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isActive: boolean;
    expanded: boolean;
    hasOpenButton: boolean;
}

export default createStyles((theme, { isActive, expanded, hasOpenButton }: CreateStylesProps) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 16,
        backgroundColor: isActive ? theme.colors.neutralWhite[0] : theme.colors.neutralGray100[0],
        cursor: "pointer",

        ...(isActive &&
            expanded && {
                boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
            }),

        [theme.fn.smallerThan("sm")]: {
            padding: "15px 16px",
            border: `1px solid ${theme.colors.neutralGray200[0]}`,
        },
    },
    title: {
        color: isActive ? theme.colors.dark[0] : theme.colors.neutralMain50[0],
        wordBreak: "break-word",
    },
    actionIcon: {
        minWidth: 40,
        minHeight: 40,
        cursor: "grab",

        "&:hover": {
            backgroundColor: theme.colors.neutralGray100[0],
        },
    },
    openButton: {
        ...(hasOpenButton && {
            [theme.fn.smallerThan("sm")]: {
                display: "none",
            },
        }),
    },
    textContent: {
        marginTop: 32,
        wordBreak: "break-word",

        [theme.fn.smallerThan("sm")]: {
            marginTop: 16,
        },
    },
    hidden: {
        display: "none",
    },
}));
