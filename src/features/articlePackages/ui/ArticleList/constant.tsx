import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import { AdminArticleFromArticlePackage } from "@entities/articlePackage";
import { Tooltip } from "@shared/ui";

export const columnOrder = ["id", "name", "category.name", "subcategory.name", "courses", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticleFromArticlePackage>["columns"] = [
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
        accessorKey: "subcategory.name",
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
