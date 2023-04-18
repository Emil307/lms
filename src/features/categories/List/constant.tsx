import { MRT_ColumnDef } from "mantine-react-table";
import { getHumanDate } from "@shared/utils";
import { AdminCategory, CategoriesFilters } from "@entities/category";

export const columnOrder = ["id", "name", "subCategories", "createdAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCategory>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Категория",
        accessorKey: "name",
    },
    {
        header: "Подкатегорий",
        accessorKey: "subCategories",
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

export const filterInitialValues: CategoriesFilters = { query: "" };
