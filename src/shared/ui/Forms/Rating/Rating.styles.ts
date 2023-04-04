import { createStyles } from "@mantine/core";

export default createStyles((theme, { size }: { size: "small" | "normal" }) => ({
    symbolGroup: {
        svg: {
            scale: size === "small" ? "0.83 !important" : 1,
        },
    },
    error: {
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> div": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
            color: theme.colors.dark[0],
            fontWeight: 400,
            fontSize: 10,
            lineHeight: "12px",
        },
    },
}));
