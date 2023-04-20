import { MRT_ColumnDef } from "mantine-react-table";
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
                {getHumanDate(cell.getValue() as Date, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
    },
];
