import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fieldset: {
        flexDirection: "column",
        width: "100%",
        gap: 24,
    },
    fieldsetHeading: {
        gap: 16,

        svg: {
            color: theme.colors.neutralMain50[0],
        },
    },
    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },

    bannerFileInput: {
        height: 304,
        width: "100%",
        maxWidth: 660,

        [theme.fn.smallerThan("xs")]: {
            height: 129,
        },
    },

    quoteTextarea: {
        textarea: {
            minHeight: 190,
        },
    },
}));
