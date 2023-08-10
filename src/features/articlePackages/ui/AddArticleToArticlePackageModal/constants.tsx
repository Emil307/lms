import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCoursesForCoursePackageFiltersForm } from "@entities/course";
import { AdminArticleFromList } from "@entities/article";
import { AttachArticlesToArticlePackageFormValidation } from "./types";

export const initialValues: AttachArticlesToArticlePackageFormValidation = {
    ids: [],
};

export const filterInitialValues: AdminCoursesForCoursePackageFiltersForm = {
    query: "",
    categoryId: "",
    subcategoryId: "",
    tags: [],
};

export const columnOrder = ["mrt-row-select", "id", "name", "category.name", "subcategories", "courses"];

export const columns: MRT_ColumnDef<AdminArticleFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 60,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 186,
    },
    {
        header: "Категория",
        accessorKey: "category.name",
        size: 186,
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategories",
        enableSorting: false,
        size: 186,
        accessorFn: ({ subcategories }) => subcategories.map(({ name }) => name).join(", "),
    },
    {
        header: "Курс",
        accessorKey: "courses",
        enableSorting: false,
        size: 186,
        accessorFn: ({ courses }) => courses.map(({ name }) => name).join(", "),
    },
];
