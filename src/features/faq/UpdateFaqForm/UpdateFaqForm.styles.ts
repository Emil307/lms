import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        padding: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.neutralWhite[0],
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",

        [theme.fn.smallerThan("sm")]: {
            paddingInline: 16,
        },
    },

    headingFormContainer: {
        justifyContent: "space-between",
        flexWrap: "wrap",
        columnGap: 32,
        rowGap: 24,
        marginBottom: 24,

        [theme.fn.smallerThan("xs")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },

    infoPanelFormContainer: {
        alignItems: "center",
        flexWrap: "wrap",
        columnGap: 32,
        rowGap: 16,

        [theme.fn.smallerThan("xs")]: {
            alignItems: "flex-start",
            flexDirection: "column",
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

    actions: {
        marginTop: 24,
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
