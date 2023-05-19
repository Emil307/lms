import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isActive: boolean;
    opened: boolean;
}

export default createStyles((theme, { isActive, opened }: CreateStylesProps) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 16,
        backgroundColor: isActive ? theme.colors.white[0] : theme.colors.light[0],

        ...(isActive && {
            boxShadow: opened
                ? "0px 16px 32px rgba(2, 6, 46, 0.08)"
                : "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        }),
    },
    question: {
        color: isActive ? theme.colors.dark[0] : theme.colors.gray45[0],
    },
    answerContent: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
}));
