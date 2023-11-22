import { AdminArticleFromList } from "@entities/article";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "category.name", "subcategories", "courses", "mrt-row-actions"];

export const columns: TColumns<AdminArticleFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 340,
    },
    {
        header: "Категория",
        accessorKey: "category.name",
        size: 340,
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategories",
        enableSorting: false,
        Cell: ({ row }) => row.original.subcategories.map(({ name }) => name).join(", "),
        size: 340,
    },
    {
        header: "Курс",
        accessorKey: "courses",
        enableSorting: false,
        Cell: ({ row }) => row.original.courses.map(({ name }) => name).join(", "),
        size: 340,
    },
];
