import { createStyles } from "@mantine/core";

export const usePaginationStyles = createStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "'elementCount pagination perPageSelect'",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
        paddingTop: 24,

        [theme.fn.smallerThan(820)]: {
            gridTemplateAreas: `'elementCount perPageSelect'
                                'pagination pagination'`,
        },
    },
    elementsCount: {
        gridArea: "elementCount",
        display: "inline-flex",
        whiteSpace: "pre",

        span: {
            whiteSpace: "nowrap",
        },
    },
    paginationButtons: {
        gridArea: "pagination",
        button: {
            width: 48,
            height: 48,
            fontSize: 16,
            lineHeight: "24px",
            ":hover, &[data-active]": {
                backgroundColor: theme.colors.dark[0],
                color: theme.colors.white[0],
            },
        },
    },
    perPageSelect: {
        gridArea: "perPageSelect",
        cursor: "pointer",

        label: {
            fontSize: 14,
            lineHeight: "16px",
            fontWeight: 500,
            color: theme.colors.gray45[0],
            whiteSpace: "nowrap",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
        },

        ".mantine-Select-rightSection": {
            pointerEvents: "none",
            width: 16,

            ".mantine-ThemeIcon-root": {
                width: 16,
            },
        },

        ".mantine-Select-input": {
            border: "none",
            maxWidth: 127,
            minHeight: "unset",
            height: "unset",
            padding: 0,
            paddingLeft: "96px !important",

            "&:hover": {
                boxShadow: "unset",
                border: "none",
            },

            "&:focus": {
                boxShadow: "unset",
                border: "none",
            },
        },
    },
}));
