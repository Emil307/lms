import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    info: {
        display: "grid",
        gridTemplateColumns: "1fr 334px",
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    bannerCardInfo: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 32,
        paddingTop: 24,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
        boxShadow: `0px 16px 32px ${theme.fn.rgba(theme.colors.shadowGray[0], 0.08)}`,
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 270,
        height: 166,
        borderRadius: 16,
    },
}));
