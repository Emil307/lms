import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCoursesForCoursePackageFiltersForm } from "@entities/course";
import { AdminArticleFromList } from "@entities/article";
import { AttachCourseToCoursePackageFormValidation } from "./types";

export const initialValues: AttachCourseToCoursePackageFormValidation = {
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
