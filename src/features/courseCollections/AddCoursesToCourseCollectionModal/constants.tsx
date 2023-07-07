import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList, AdminCoursesForCourseCollectionFiltersForm } from "@entities/course";
import { AttachCoursesToCourseCollectionFormValidation } from "./types";

export const initialValues: AttachCoursesToCourseCollectionFormValidation = {
    ids: [],
};

export const filterInitialValues: AdminCoursesForCourseCollectionFiltersForm = {
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
    },
    {
        header: "Курс",
        accessorKey: "name",
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
    },
    {
        header: "Подкатегория",
        accessorKey: "subcategory.name",
    },
];
