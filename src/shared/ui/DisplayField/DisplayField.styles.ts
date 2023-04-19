import { createStyles } from "@mantine/core";

export default createStyles((theme, { variant }: { variant: "compact" | "default" }) => ({
    root: {
        flexDirection: variant === "default" ? "row" : "column",
        justifyContent: "space-between",
        alignItems: variant === "default" ? "center" : "flex-start",
        rowGap: 0,
        width: "100%",
    },
    label: {
        alignSelf: "self-start",
        fontWeight: 500,
        fontSize: variant === "default" ? 16 : 12,
        lineHeight: variant === "default" ? "24px" : "16px",
        color: theme.colors.gray45[0],
    },
    value: {
        fontWeight: 500,
        lineHeight: "24px",
        color: theme.colors.dark[0],
        textAlign: "end",
    },
}));
