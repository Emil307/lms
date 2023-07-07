import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    isOpened: boolean;
}

export default createStyles((theme, { isOpened }: CreateStylesProps) => ({
    rootTarget: {
        paddingBlock: 8,
        paddingInline: 16,
        borderRadius: 160,
        backgroundColor: isOpened ? theme.colors.grayLight[0] : theme.colors.white[0],
        cursor: "pointer",
    },

    indicator: {
        display: "flex",
    },

    dropdown: {
        padding: 8,
        borderRadius: 16,
        boxShadow: "0px 16px 32px 0px rgba(2, 6, 46, 0.08)",
    },
}));
