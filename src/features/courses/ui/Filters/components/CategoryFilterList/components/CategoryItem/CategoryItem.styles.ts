import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isActive: boolean;
}

export default createStyles((theme, { isActive }: CreateStylesProps) => ({
    root: {
        width: "fit-content",
        paddingBlock: 12,
        paddingInline: 16,
        borderRadius: 160,
        backgroundColor: isActive ? theme.colors.primary[0] : theme.colors.white[0],
        cursor: "pointer",
    },
    content: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: isActive ? theme.colors.white[0] : theme.colors.dark[0],
    },
}));
