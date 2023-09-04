import { AdminTagFromList, TagsFilters } from "@entities/tag";
import { getHumanDate } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "createdAt", "mrt-row-actions"];

export const columns: TColumns<AdminTagFromList> = [
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
                {getHumanDate(cell.getValue() as Date, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
    },
];

export const filterInitialValues: TagsFilters = { query: "" };
