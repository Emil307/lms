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

export const columnOrder = [
    "mrt-row-select",
    "id",
    "name",
    "category",
    //TODO: нужно чтобы бек добавил
    // "subcategory"
];

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
        accessorKey: "category",
        accessorFn: (row) => row.category?.name || "",
    },
    //TODO: нужно чтобы бек добавил
    // {
    //     header: "Подкатегория",
    //     accessorKey: "subcategory",
    //     accessorFn: (row) => row.subcategory?.name || "",
    // },
];
