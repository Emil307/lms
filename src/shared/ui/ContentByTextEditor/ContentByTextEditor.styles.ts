import { createStyles } from "@mantine/core";
import { textEditorContentStyles } from "@shared/styles";

export default createStyles((theme) => ({
    root: {
        maxWidth: "100%",
        ...textEditorContentStyles(theme),
    },
    zoomIconWrapper: {
        position: "absolute",
        bottom: 14,
        left: 14,
        borderRadius: 160,
        background: theme.colors.neutralWhite[0],
    },
}));
