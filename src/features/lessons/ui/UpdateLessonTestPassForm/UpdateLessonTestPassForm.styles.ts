import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    innerForm: {
        flexDirection: "column",
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },
    footerInnerForm: {
        display: "grid",
        gridTemplateAreas: "'iconBack progressBar buttonNextOrSubmit'",
        gridTemplateColumns: "auto 1fr auto",
        width: "100%",
        columnGap: 24,
        rowGap: 16,

        [theme.fn.smallerThan("sm")]: {
            gridTemplateAreas: `'progressBar progressBar'
                                'iconBack buttonNextOrSubmit'`,
            gridTemplateColumns: "auto 1fr",
            columnGap: 16,
        },
    },

    actionIconBack: {
        gridArea: "iconBack",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 8,
        border: `2px solid ${theme.colors.gray20[0]}`,

        svg: {
            color: theme.colors.gray45[0],
        },
    },
    progressBarWrapper: {
        flex: 1,
        gridArea: "progressBar",
    },
    buttonNextOrSubmit: {
        gridArea: "buttonNextOrSubmit",
        width: 200,

        [theme.fn.smallerThan("sm")]: {
            justifySelf: "flex-end",
            width: "100%",
            maxWidth: 200,
        },
    },
}));
