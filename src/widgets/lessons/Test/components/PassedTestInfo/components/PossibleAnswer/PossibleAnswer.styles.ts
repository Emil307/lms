import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isCorrect: boolean;
}

export default createStyles((theme, { isCorrect }: CreateStylesParams) => ({
    root: {
        paddingInline: 18,
        paddingBlock: 16,
        gap: 16,
        borderRadius: 8,
        border: `1px solid ${theme.colors.grayLight[0]}`,
        backgroundColor: theme.colors.white[0],
    },
    answerLetterWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 60,
        backgroundColor: isCorrect ? theme.colors.done16[0] : theme.colors.warning16[0],
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: isCorrect ? theme.colors.done[0] : theme.colors.warning[0],
    },
}));