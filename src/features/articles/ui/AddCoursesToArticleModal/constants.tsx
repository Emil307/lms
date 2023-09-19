import { AdminCourseFromList, AdminCoursesNoIncludedArticleFiltersForm } from "@entities/course";
import { TColumns } from "@shared/ui/DataGrid/types";
import { AttachCoursesToArticleFormValidation } from "./types";

export const initialValues: AttachCoursesToArticleFormValidation = {
    courseIds: [],
};

export const filterInitialValues: AdminCoursesNoIncludedArticleFiltersForm = {
    query: "",
    categoryId: "",
    subcategoryId: "",
    tagIds: [],
};

export const columnOrder = ["mrt-row-select", "id", "name", "category.name", "subcategory.name"];

export const columns: TColumns<AdminCourseFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 60,
    },
    {
        header: "Название",
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
