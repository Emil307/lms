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

        "> p": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },
}));
