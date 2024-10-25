import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    content: {
        flexDirection: "column",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            gap: 16,
        },
    },
    lessonContent: {
        flexDirection: "column",
        padding: 24,
        paddingBottom: 56,
        gap: 48,
        borderRadius: 16,
        backgroundColor: theme.colors.neutralWhite[0],
    },
    videoItemWrapper: {
        paddingInline: 24,
        paddingBlock: 32,

        [theme.fn.smallerThan("sm")]: {
            paddingInline: 16,
            paddingBlock: 24,
        },
    },
}));
