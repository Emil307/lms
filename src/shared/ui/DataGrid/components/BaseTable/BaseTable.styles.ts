import { createStyles, CSSObject, MantineTheme } from "@mantine/core";
import { TCellBadge } from "@shared/ui/DataGrid/types";

interface BaseTableStylesProps {
    hasActionButton?: boolean;
}

export const useBaseTableStyles = createStyles((theme, { hasActionButton = false }: BaseTableStylesProps) => ({
    selectCheckbox: {
        input: {
            backgroundColor: theme.colors.neutralGray200[0],
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
        },
    },
    tableBodyCellValueWrapper: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        padding: "4px 0",
    },
    tableBodyCellValue: {
        display: "inline",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: "16px",
    },
    tableBodyRow: {
        cursor: "pointer",
        ".mantine-ActionIcon-root": {
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
            ":hover": {
                backgroundColor: theme.colors.primary8[0],
                svg: {
                    color: theme.colors.primary[0],
                },
            },
        },
    },
    tableContainer: {
        borderRadius: 8,
        minHeight: 0,
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        border: "none",
        boxShadow: "none",
    },
    columnActionsButton: {
        backgroundColor: "red",
        marginLeft: "8px !important",
    },
    tableHeadCell: {
        padding: "16px !important",
        borderBottom: "none !important",
        ".mantine-TableHeadCell-Content": {
            height: 24,
            alignItems: "center",
        },
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
        backgroundColor: `${theme.colors.neutralGray100[0]} !important`,
    },
    skeleton: {
        maxWidth: 48,
        height: 24,
    },
}));

type TGetStylesForCellProps = {
    cellBadges: TCellBadge[] | false;
    columnId: string;
};

const getBadgeColor = (theme: MantineTheme, cellBadges: TCellBadge[]) => {
    const badgeInfo = cellBadges.find((item) => item.condition);
    if (!badgeInfo) {
        return theme.colors.neutralGray100[0];
    }
    if (!badgeInfo.color) {
        return theme.colors.secondary[0];
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return theme.colors[badgeInfo.color] ? theme.colors[badgeInfo.color] : badgeInfo.color;
};

const renderCellBadge = ({ cellBadges, theme }: Omit<TGetStylesForCellProps, "columnId"> & { theme: MantineTheme }): CSSObject => {
    if (!cellBadges) {
        return {};
    }
    return {
        position: "relative",
        ":before": {
            content: "''",
            position: "absolute",
            backgroundColor: getBadgeColor(theme, cellBadges),
            width: 4,
            borderRadius: "0 8px 8px 0",
            height: "100%",
            top: 1,
            bottom: 1,
            left: 0,
        },
    };
};

export const getStylesForCell = createStyles((theme, { cellBadges, columnId }: TGetStylesForCellProps) => ({
    tableBodyCell: {
        border: "none !important",
        fontSize: "14px !important",
        lineHeight: "16px !important",
        borderBottom: `1px solid ${theme.colors.neutralGray100[0]} !important`,
        padding: "0 16px !important",
        zIndex: 99,
        ":first-of-type": {
            padding: "12px 16px !important",
            ...renderCellBadge({ cellBadges, theme }),
        },
        ...(columnId === "mrt-row-actions" && {
            ":last-of-type": {
                pointerEvents: "none",
            },
        }),
    },
}));
