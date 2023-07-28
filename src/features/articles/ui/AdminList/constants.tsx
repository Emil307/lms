import { MRT_ColumnDef } from "mantine-react-table";
import { AdminArticleFromList, AdminArticlesFiltersForm } from "@entities/article";

export const columnOrder = ["id", "name", "category.name", "subcategories", "courses", "isActive", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticleFromList>["columns"] = [
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
        accessorKey: "category.name",
        accessorFn: (row) => row.category?.name || "",
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategories",
        enableSorting: false,
        accessorFn: (row) => row.subcategories.map(({ name }) => name).join(", "),
    },

    {
        header: "Учебный курс",
        accessorKey: "courses",
        enableSorting: false,
        accessorFn: (row) => row.courses.map(({ name }) => name).join(", "),
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

export const filterInitialValues: AdminArticlesFiltersForm = { isActive: "", query: "", categoryId: "", subcategoryId: "", courseIds: "" };
