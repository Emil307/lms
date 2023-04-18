import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { CSSObject, MantineTheme } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
import { AdminCategory } from "@entities/category";

export const columnOrder = ["id", "name", "createdAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCategory>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Подкатегория",
        accessorKey: "name",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        Cell: ({ cell }) => (
            <>
                {getHumanDate(new Date(cell.getValue() as string), {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
    },
];

export const getStylesForCell = (theme: MantineTheme, cell: MRT_Cell<AdminCategory>): CSSObject => {
    return {
        ":first-of-type": {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                backgroundColor: cell.row.original.isActive ? theme.colors.done[0] : theme.colors.light[0],
                width: 4,
                borderRadius: "0 8px 8px 0",
                height: "100%",
                top: 1,
                bottom: 1,
                left: 0,
            },
        },
    };
};
