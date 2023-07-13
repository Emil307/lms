import { MRT_ColumnDef } from "mantine-react-table";
import { AdminArticleFromList } from "@entities/article";

export const columnOrder = ["id", "name", "category.name", "subcategories", "courses", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticleFromList>["columns"] = [
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
