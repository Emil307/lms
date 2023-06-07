import { createStyles, CSSObject, MantineTheme } from "@mantine/core";

interface BaseTableStylesProps {
    hasActionButton?: boolean;
}

export const useBaseTableStyles = createStyles((theme, { hasActionButton = false }: BaseTableStylesProps) => ({
    selectCheckbox: {
        input: {
            backgroundColor: theme.colors.grayLight[0],
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
        },
    },
    tableBodyCellValue: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
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
        padding: "19px 16px !important",
        borderBottom: "none !important",
        ".mantine-TableHeadCell-Content-Wrapper": {
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "16px",
            whiteSpace: "nowrap",
        },
        button: {
            marginLeft: "8px !important",
        },
        ...(hasActionButton
            ? {
                  ":last-of-type": {
                      "> div": {
                          display: "none",
                      },
                  },
              }
            : {}),
    },
    tableHeadRow: {
        backgroundColor: `${theme.colors.light[0]} !important`,
    },
    skeleton: {
        maxWidth: 100,
        height: 30,
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
        borderBottom: `1px solid ${theme.colors.light[0]} !important`,
        padding: "10px 16px !important",
        zIndex: 99,
        ":first-of-type": renderCellBadge({ renderActive, theme, isActive }),
        ":last-of-type": {
            pointerEvents: "none",
        },
    },
}));
