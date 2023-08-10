import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList, AdminCoursesForCoursePackageFiltersForm } from "@entities/course";
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

export const columnOrder = ["mrt-row-select", "id", "name", "category.name", "subcategory.name"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 60,
    },
    {
        header: "Курс",
        accessorKey: "name",
        size: 248,
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
        size: 248,
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategory.name",
        size: 248,
    },
];
