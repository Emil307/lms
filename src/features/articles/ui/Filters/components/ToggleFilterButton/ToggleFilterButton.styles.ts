import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isOpened: boolean;
}

export default createStyles((theme, { isOpened }: CreateStylesParams) => ({
    root: {
        alignItems: "center",
        gap: 8,
    },
    wrapperLeftIcon: {
        color: isOpened ? theme.colors.secondary[0] : theme.colors.dark[0],
    },

    iconToggle: {
        height: 24,
        width: 24,
        minHeight: 24,
        minWidth: 24,
        borderRadius: 24,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.dark[0],
        ":hover": {
            backgroundColor: theme.colors.secondary8[0],
        },

        svg: {
            width: 9,
            color: theme.colors.secondaryHover[0],
            strokeWidth: 5,
        },
    },
}));
