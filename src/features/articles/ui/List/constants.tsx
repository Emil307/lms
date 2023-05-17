import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import { AdminArticle, AdminArticlesFilters } from "@entities/article";
import { Tooltip } from "@shared/ui";

export const columnOrder = ["id", "name", "category", "subcategory", "courses", "isActive", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticle>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Статья",
        accessorKey: "name",
    },

    {
        header: "Категория",
        accessorKey: "category",
        accessorFn: (row) => row.category.name,
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategory",
        accessorFn: (row) => row.subcategory.name,
    },

    {
        header: "Учебный курс",
        accessorKey: "courses",
        accessorFn: (row) => {
            const courseNames = row.courses.join(", ");
            return (
                <Tooltip label={courseNames}>
                    <Text lineClamp={1}>{courseNames}</Text>
                </Tooltip>
            );
        },
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminArticlesFilters = { isActive: "", query: "", categoryId: "", subcategoryId: "", courseId: "" };
