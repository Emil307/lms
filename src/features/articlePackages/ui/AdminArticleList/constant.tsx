import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import { Tooltip } from "@shared/ui";
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
        Cell: ({ row }) => {
            const listCategoryNames = row.original.subcategories.map(({ name }) => name).join(", ");
            return (
                <Tooltip label={listCategoryNames}>
                    <Text lineClamp={1}>{listCategoryNames}</Text>
                </Tooltip>
            );
        },
    },
    {
        header: "Курс",
        accessorKey: "courses",
        enableSorting: false,
        Cell: ({ row }) => {
            const listCategoryNames = row.original.courses.map(({ name }) => name).join(", ");
            return (
                <Tooltip label={listCategoryNames}>
                    <Text lineClamp={1}>{listCategoryNames}</Text>
                </Tooltip>
            );
        },
    },
];
