import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        padding: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",

        [theme.fn.smallerThan("sm")]: {
            paddingInline: 16,
        },
    },
    answerTextarea: {
        marginTop: 8,

        textarea: {
            minHeight: 152,
        },

        [theme.fn.smallerThan("sm")]: {
            textarea: {
                minHeight: 190,
            },
        },
    },
}));
