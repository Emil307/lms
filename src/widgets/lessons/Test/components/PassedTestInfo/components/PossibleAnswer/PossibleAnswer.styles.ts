import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isCorrect: boolean;
}

export default createStyles((theme, { isCorrect }: CreateStylesParams) => ({
    root: {
        alignItems: "center",
        paddingInline: 18,
        paddingBlock: 16,
        gap: 16,
        borderRadius: 8,
        border: `1px solid ${theme.colors.neutralGray200[0]}`,
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("sm")]: {
            paddingInline: 16,
            paddingBlock: 14,
            gap: 8,
        },
    },
    answerLetterWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        minWidth: 40,
        borderRadius: 60,
        backgroundColor: isCorrect ? theme.colors.done20[0] : theme.colors.warning20[0],
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: isCorrect ? theme.colors.secondary[0] : theme.colors.warning[0],
    },
    content: {
        overflowWrap: "anywhere",
    },
}));
