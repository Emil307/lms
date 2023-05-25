import { createStyles, CSSObject, MantineTheme } from "@mantine/core";

export const useBaseTableStyles = createStyles((theme) => ({
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
        ":first-of-type": {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                backgroundColor: theme.colors.light[0],
                width: 4,
                borderRadius: "0 8px 8px 0",
                height: "100%",
                top: 1,
                bottom: 1,
                left: 0,
            },
        },
        ":last-of-type": {
            pointerEvents: "none",
        },
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
        ".mantine-TableHeadCell-Content-Wrapper": {
            whiteSpace: "nowrap",
        },

        button: {
            marginLeft: "8px !important",
        },
    },
    tableHeadRow: {
        backgroundColor: `${theme.colors.light[0]} !important`,
    },
}));

type TGetStylesForCellProps = {
    isActive: boolean;
    renderActive: boolean;
};

const renderCellBadge = ({ renderActive, theme, isActive }: TGetStylesForCellProps & { theme: MantineTheme }): CSSObject => {
    if (!renderActive) {
        return {};
    }
    return {
        position: "relative",
        ":before": {
            content: "''",
            position: "absolute",
            backgroundColor: isActive ? theme.colors.done[0] : theme.colors.light[0],
            width: 4,
            borderRadius: "0 8px 8px 0",
            height: "100%",
            top: 1,
            bottom: 1,
            left: 0,
        },
    };
};

export const getStylesForCell = createStyles((theme, { renderActive, isActive }: TGetStylesForCellProps) => ({
    tableBodyCell: {
        border: "none !important",
        fontSize: "14px !important",
        lineHeight: "16px !important",
        borderBottom: `2px solid ${theme.colors.light[0]} !important`,
        zIndex: 99,
        ":first-of-type": renderCellBadge({ renderActive, theme, isActive }),
        ":last-of-type": {
            pointerEvents: "none",
        },
    },
}));
