import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        paddingBlock: 24,
        paddingInline: 32,
        gap: 8,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "row",
            alignItems: "center",
            paddingInline: 0,
        },
    },
}));
