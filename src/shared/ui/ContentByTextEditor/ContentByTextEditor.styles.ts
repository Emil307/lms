import { createStyles } from "@mantine/core";
import { textEditorContentStyles } from "@shared/styles";

export default createStyles((theme) => ({
    root: {
        ...textEditorContentStyles(theme),
    },
    imageWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
        height: 546,
        marginTop: 24,
        borderRadius: 12,
        background: theme.colors.neutralLight[0],

        [theme.fn.smallerThan("md")]: {
            marginTop: 16,
        },
    },
    zoomIconWrapper: {
        position: "absolute",
        bottom: 14,
        left: 14,
        borderRadius: 160,
        background: theme.colors.white[0],
    },
}));
