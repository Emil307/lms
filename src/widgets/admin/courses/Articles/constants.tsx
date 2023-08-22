import { MRT_ColumnDef } from "mantine-react-table";
import { AdminArticleFromList } from "@entities/article";

export const columnOrder = ["id", "name", "category.name", "subcategories", "isActive", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticleFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Статья",
        accessorKey: "name",
        size: 398,
    },
    {
        header: "Категория",
        accessorKey: "category.name",
        size: 398,
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategories",
        enableSorting: false,
        size: 398,
        Cell: ({ row }) => row.original.subcategories.map(({ name }) => name).join(", "),
    },

    {
        header: "Статус",
        accessorKey: "isActive",
        accessorFn: ({ isActive }) => (isActive ? "Активен" : "Неактивен"),
        size: 160,
    },
];
