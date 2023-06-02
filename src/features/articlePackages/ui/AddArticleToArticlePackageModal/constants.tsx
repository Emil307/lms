import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import { AdminCoursesForCoursePackageFiltersForm } from "@entities/course";
import { AdminArticleFromList } from "@entities/article";
import { Tooltip } from "@shared/ui";
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
        Cell: ({ row }) => {
            const listCategoryNames = row.original.subcategories.map(({ name }) => name).join(", ");
            return (
                <Tooltip label={listCategoryNames}>
                    <Text lineClamp={1}>{listCategoryNames}</Text>
                </Tooltip>
            );
        },
    },
    {
        header: "Курс",
        accessorKey: "courses",
        enableSorting: false,
        Cell: ({ row }) => {
            const listCoursesNames = row.original.courses.map(({ name }) => name).join(", ");
            return (
                <Tooltip label={listCoursesNames}>
                    <Text lineClamp={1}>{listCoursesNames}</Text>
                </Tooltip>
            );
        },
    },
];
