import { createStyles } from "@mantine/core";

export default createStyles((theme, { variant }: { variant: "whiteBg" | "grayBg" }) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 32,
        paddingTop: 24,
        borderRadius: 16,
        backgroundColor: variant === "whiteBg" ? theme.colors.white[0] : theme.colors.light[0],
        boxShadow: variant === "whiteBg" ? `0px 16px 32px ${theme.fn.rgba(theme.colors.shadowGray[0], 0.08)}` : "none",
    },
    content: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
    },
    actions: {
        gap: 8,
        button: {
            width: "100%",
        },
    },
}));
