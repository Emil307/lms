import { createStyles } from "@mantine/core";

export const usePaginationStyles = createStyles((theme) => ({
    elementsCount: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        span: {
            color: theme.colors.gray45[0],
        },
    },
    paginationButtons: {
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
        cursor: "pointer",
        label: {
            fontSize: 14,
            lineHeight: "16px",
            fontWeight: 500,
            color: theme.colors.gray45[0],
        },
        select: {
            border: "none",
            paddingLeft: 0,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "16px",
        },
        "@media (min-width: 720px)": {
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },
        "& .mantine-Select-input": {
            width: "90px",
        },
    },
}));
