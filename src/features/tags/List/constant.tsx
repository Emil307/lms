import { MRT_ColumnDef } from "mantine-react-table";
import { AdminTag, TagsFilters } from "@entities/tag";
import { getHumanDate } from "@shared/utils";

export const columnOrder = ["id", "name", "createdAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminTag>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Тег",
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

export const filterInitialValues: TagsFilters = { query: "" };
