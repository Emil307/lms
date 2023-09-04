import { AdminArticleFromList } from "@entities/article";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "category.name", "subcategories", "courses", "mrt-row-actions"];

export const columns: TColumns<AdminArticleFromList> = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название",
        accessorKey: "name",
    },
    {
        header: "Категория",
        accessorKey: "category.name",
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategories",
        enableSorting: false,
        Cell: ({ row }) => row.original.subcategories.map(({ name }) => name).join(", "),
    },
    {
        header: "Курс",
        accessorKey: "courses",
        enableSorting: false,
        Cell: ({ row }) => row.original.courses.map(({ name }) => name).join(", "),
    },
];
