import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isActive: boolean;
}

export default createStyles((theme, { isActive }: CreateStylesProps) => ({
    root: {},
    reactionButton: {
        height: 40,
        width: 77,
        borderRadius: 160,
        color: isActive ? theme.colors.secondary[0] : theme.colors.dark[0],
        backgroundColor: theme.colors.neutralWhite[0],

        ":hover": {
            backgroundColor: theme.colors.neutralGray200[0],
            svg: {
                color: theme.colors.secondary[0],
            },
        },

        ":active": {
            backgroundColor: theme.colors.neutralGray200[0],
            svg: {
                color: theme.colors.dark[0],
            },
        },
        ":disabled": {
            color: theme.colors.neutralMain50[0],
            backgroundColor: theme.colors.neutralGray200[0],
            svg: {
                color: theme.colors.neutralMain50[0],
            },
        },
    },
}));
