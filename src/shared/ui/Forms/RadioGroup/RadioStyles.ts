import { createStyles } from "@mantine/core";

export const useRadioStyles = createStyles((theme) => ({
    root: {
        ":hover": {
            svg: {
                opacity: 1,
                transform: "scale(1)",
                color: theme.colors.primary[0],
            },
        },
    },
    label: {
        paddingLeft: "8px",
        cursor: "pointer",
    },
    radio: {
        cursor: "pointer",
        backgroundColor: theme.colors.grayLight[0],
        border: `1px solid ${theme.fn.rgba(theme.colors.primary[0], 0.0)}`,
        ":hover": {
            border: `1px solid ${theme.colors.primary[0]}`,
            backgroundColor: theme.colors.white[0],
        },
        ":disabled": {
            border: `1px solid ${theme.fn.rgba(theme.colors.primary[0], 0.0)}`,
            backgroundColor: theme.colors.gray20[0],
        },
    },
}));
