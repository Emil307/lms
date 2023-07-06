import { createStyles } from "@mantine/core";
import { textEditorContentStyles } from "@shared/styles";

export default createStyles((theme) => ({
    root: {
        ...textEditorContentStyles(theme),
    },
}));
