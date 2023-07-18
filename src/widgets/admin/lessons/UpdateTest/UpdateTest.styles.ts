import { createStyles, MantineTheme } from "@mantine/core";

interface StylesProps {
    greenCheckIcon?: boolean;
    hasError?: boolean;
}

export default createStyles((theme, { greenCheckIcon = true, hasError }: StylesProps) => ({
    card: {
        width: "100%",
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralLight[0],
        border: "1px solid",
        borderColor: hasError ? theme.colors.warning[0] : theme.colors.neutralLight[0],
    },
    taskCard: {
        backgroundColor: theme.colors.white[0],
        padding: "16px 18px",
        borderRadius: 8,
        border: "1px solid",
        borderColor: theme.colors.grayLight[0],
    },
    letter: {
        minWidth: 40,
        height: 40,
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 600,
    },
    button: {
        borderRadius: 160,
    },
    checkIconWrapper: getCheckIconWrapper(theme, greenCheckIcon),
    helpIconWrapper: {
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
    },
    questionCard: {
        padding: "16px 18px",
        borderRadius: 8,
        border: "1px solid",
        borderColor: theme.colors.grayLight[0],
        backgroundColor: theme.colors.white[0],
    },
    actionIcon: {
        minWidth: 40,
        height: 40,
        backgroundColor: theme.colors.white[0],
    },
    icon: {
        pointerEvents: "none",
    },
    dragIcon: {
        cursor: "grab",
    },
    error: {
        display: "flex",
        gap: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> p": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },
}));

const getCheckIconWrapper = (theme: MantineTheme, greenCheckIcon: boolean) => {
    if (greenCheckIcon) {
        return {
            backgroundColor: theme.colors.done16[0],
            borderRadius: 56,
        };
    }
    return {
        backgroundColor: theme.colors.neutralLight[0],
        borderRadius: 56,
        path: {
            fill: theme.colors.neutral_gray[0],
        },
    };
};
