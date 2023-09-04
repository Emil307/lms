import dayjs from "dayjs";
import { AdminCourseCollectionFromList, AdminCourseCollectionsFiltersForm } from "@entities/courseCollection";
import { TColumns } from "@shared/ui/DataGrid/types";

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminCourseCollectionsFiltersForm = {
    isActive: "",
    query: "",
    courseId: "",
    createdAtFrom: null,
    createdAtTo: null,
};

export const columnOrder = ["id", "name", "coursesCount", "createdAt", "mrt-row-actions"];

export const columns: TColumns<AdminCourseCollectionFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 452,
    },
    {
        header: "Кол-во курсов",
        accessorKey: "coursesCount",
        enableSorting: false,
        size: 252,
    },

    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 252,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];
