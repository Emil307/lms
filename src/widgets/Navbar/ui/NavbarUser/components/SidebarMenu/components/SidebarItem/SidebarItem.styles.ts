import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isActive?: boolean;
}

export default createStyles((theme, { isActive }: CreateStylesParams) => ({
    root: {
        borderRadius: 160,
        backgroundColor: isActive ? theme.colors.grayLight[0] : theme.colors.white[0],

        ".mantine-Button-leftIcon": {
            width: 24,
            height: 24,

            ".mantine-ThemeIcon-root": {
                color: theme.colors.dark[0],
                width: 24,
                height: 24,
            },
        },

        ":hover": {
            backgroundColor: theme.colors.grayLight[0],

            ".mantine-Button-leftIcon": {
                color: theme.colors.secondary[0],

                ".mantine-ThemeIcon-root": {
                    svg: {
                        color: theme.colors.secondary[0],
                    },
                },
            },
        },

        ":disabled": {
            color: theme.colors.gray45[0],
            backgroundColor: theme.colors.grayLight[0],
            ".mantine-Button-leftIcon": {
                color: theme.colors.gray45[0],

                ".mantine-ThemeIcon-root": {
                    svg: {
                        color: theme.colors.gray45[0],
                    },
                },
            },
        },
    },
}));
