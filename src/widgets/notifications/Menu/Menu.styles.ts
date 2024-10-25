import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isOpened: boolean;
}

export default createStyles((theme, { isOpened }: CreateStylesProps) => ({
    rootTarget: {
        width: 56,
        height: 56,
        borderRadius: 56,
        backgroundColor: isOpened ? theme.colors.neutralGray100[0] : theme.colors.neutralWhite[0],

        svg: {
            color: theme.colors.dark[0],
            width: 24,
            height: 24,
        },

        "&:hover": {
            backgroundColor: theme.colors.neutralGray100[0],
        },

        [theme.fn.smallerThan("md")]: {
            width: 48,
            height: 48,
        },
    },
    indicator: {
        display: "flex",
    },
    dropdown: {
        padding: 8,
        borderRadius: 16,
        boxShadow: "0px 16px 32px 0px rgba(2, 6, 46, 0.08)",
    },
}));
