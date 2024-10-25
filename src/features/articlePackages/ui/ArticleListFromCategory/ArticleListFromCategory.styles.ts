import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    titleList: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.neutralMain50[0],
    },
    wrapperList: {
        height: 304,
        paddingRight: 8,
        gap: 8,
        borderRadius: 8,
    },
}));
