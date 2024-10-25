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
        backgroundColor: theme.colors.neutralGray100[0],
        border: "1px solid",
        borderColor: hasError ? theme.colors.warning[0] : theme.colors.neutralGray100[0],
    },
    topCard: {
        gap: 32,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],
        border: "1px solid",
        borderColor: hasError ? theme.colors.warning[0] : theme.colors.neutralGray100[0],

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
    questionCard: {
        width: "100%",
        gap: 32,
        flexDirection: "column",
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],
        border: "1px solid",
        borderColor: hasError ? theme.colors.warning[0] : theme.colors.neutralGray100[0],

        [theme.fn.smallerThan("sm")]: {
            padding: "0 0 32px 0",
            backgroundColor: theme.colors.neutralWhite[0],
            border: "none",
        },
    },
    answersCountInput: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
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
    answerCard: {
        padding: "16px 18px",
        borderRadius: 8,
        border: "1px solid",
        borderColor: theme.colors.neutralGray200[0],
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("sm")]: {
            flexWrap: "wrap",
            justifyContent: "space-between",

            "> *": {
                "&:first-child": {
                    order: 1,
                },
                "&:nth-child(2)": {
                    order: 3,
                    width: "100%",
                },
                "&:last-child": {
                    order: 2,
                },
            },
        },
    },
    actionIcon: {
        minWidth: 40,
        height: 40,
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("sm")]: {
            "&:hover": {
                backgroundColor: theme.colors.neutralGray200[0],
            },
        },
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
            backgroundColor: theme.colors.done20[0],
            borderRadius: 56,
        };
    }
    return {
        backgroundColor: theme.colors.neutralGray100[0],
        borderRadius: 56,
        path: {
            fill: theme.colors.neutralGray300[0],
        },
    };
};
