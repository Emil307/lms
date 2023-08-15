import { MRT_ColumnDef } from "mantine-react-table";
import { AdminArticleFromList, AdminArticlesFiltersForm } from "@entities/article";

export const columnOrder = ["id", "name", "category.name", "subcategories", "courses", "isActive", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticleFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Статья",
        accessorKey: "name",
        size: 299,
    },

    {
        header: "Категория",
        accessorKey: "category.name",
        size: 299,
        accessorFn: (row) => row.category?.name || "",
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategories",
        enableSorting: false,
        size: 299,
        accessorFn: (row) => row.subcategories.map(({ name }) => name).join(", "),
    },

    {
        header: "Учебный курс",
        accessorKey: "courses",
        enableSorting: false,
        size: 299,
        accessorFn: (row) => row.courses.map(({ name }) => name).join(", "),
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        size: 160,
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminArticlesFiltersForm = { isActive: "", query: "", categoryId: "", subcategoryId: "", courseIds: "" };
