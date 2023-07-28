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
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",

        label: {
            fontSize: 14,
            lineHeight: "16px",
            fontWeight: 500,
            color: theme.colors.gray45[0],
            whiteSpace: "nowrap",
        },
        select: {
            border: "none",
            paddingRight: 20,
            paddingLeft: 0,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "16px",
            cursor: "pointer",
        },

        ".mantine-NativeSelect-rightSection": {
            pointerEvents: "none",
            width: 16,
        },

        "& .mantine-Select-input": {
            width: "90px",
        },
    },
}));
