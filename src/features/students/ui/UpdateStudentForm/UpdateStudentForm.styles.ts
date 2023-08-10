import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
}));
