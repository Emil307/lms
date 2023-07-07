import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminCourseCollectionFromList, AdminCourseCollectionsFiltersForm } from "@entities/courseCollection";

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

export const columns: MRT_ColumnDef<AdminCourseCollectionFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название",
        accessorKey: "name",
    },
    {
        header: "Кол-во курсов",
        accessorKey: "coursesCount",
        enableSorting: false,
    },

    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];
