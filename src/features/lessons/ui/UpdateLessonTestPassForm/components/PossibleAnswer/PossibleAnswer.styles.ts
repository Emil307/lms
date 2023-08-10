import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isSelected: boolean;
}

export default createStyles((theme, { isSelected }: CreateStylesParams) => ({
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
        backgroundColor: isSelected ? theme.colors.primaryHover[0] : theme.colors.primary8[0],
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: isSelected ? theme.colors.white[0] : theme.colors.primaryHover[0],
    },
}));
