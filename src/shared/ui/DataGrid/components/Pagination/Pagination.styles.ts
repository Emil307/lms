import { createStyles } from "@mantine/core";

export const usePaginationStyles = createStyles((theme) => ({
    elementsCount: {
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
            color: theme.colors.gray45[0],
        },
        select: {
            border: "none",
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
