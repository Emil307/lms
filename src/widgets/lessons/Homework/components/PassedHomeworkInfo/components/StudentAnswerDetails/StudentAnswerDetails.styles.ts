import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "grid",
        // gridTemplateAreas: "'iconBack progressBar buttonNextOrSubmit'",
        gridTemplateAreas: `'avatar textHeadingContainer editIcon'
                            'avatar content editIcon'
                            '. documents editIcon'`,
        gridTemplateColumns: "auto 1fr auto",
        padding: 16,
        columnGap: 8,
        borderRadius: 8,
        border: `1px solid ${theme.colors.neutralGray200[0]}`,
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("sm")]: {
            gridTemplateAreas: `'avatar textHeadingContainer'
                                'content content'
                                'documents documents'`,

            gridTemplateColumns: "auto 1fr",
        },
    },
    answerTextHeadingContainer: {
        gridArea: "textHeadingContainer",
        gap: 6,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    avatarWrapper: {
        gridArea: "avatar",
        width: 32,
        height: 32,
        minWidth: 32,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.4)",
        },
    },
    editActionIcon: {
        gridArea: "editIcon",
        width: 32,
        height: 32,
        color: theme.colors.neutralMain50[0],

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    answerContent: {
        gridArea: "content",
        marginTop: 2,

        [theme.fn.smallerThan("sm")]: {
            marginTop: 8,
        },
    },
    documentListWrapper: {
        gridArea: "documents",
        flexDirection: "column",
        marginTop: 24,
        gap: 16,
    },
}));
