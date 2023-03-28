import { createStyles } from "@mantine/core";

export const useManagedDataGridStyles = createStyles((theme) => ({
    selectCheckbox: {
        input: {
            backgroundColor: theme.colors.grayLight[0],
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
        },
    },
    tableBodyCell: {
        border: "none !important",
        fontSize: "14px !important",
        lineHeight: "16px !important",
        borderBottom: `2px solid ${theme.colors.light[0]} !important`,
        zIndex: 99,
        ":last-of-type": {
            pointerEvents: "none",
        }
    },
    tableBodyRow: {
        cursor: "pointer",
    },
    tableContainer: {
        borderRadius: 8,
    },
    paper: {
        border: "none",
        boxShadow: "none",
    },
    columnActionsButton: {
        backgroundColor: "red",
        marginLeft: "8px !important",
    },
    tableHeadCell: {
        borderBottom: "none !important",

        button: {
            marginLeft: "8px !important",
        },
    },
    tableHeadRow: {
        backgroundColor: `${theme.colors.light[0]} !important`,
    },
}));
