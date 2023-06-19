import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    chatHeader: {
        flexDirection: "column",
        paddingBlock: 24,
        paddingInline: 32,
        gap: 8,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,
    },
    chatHeaderRoleName: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
