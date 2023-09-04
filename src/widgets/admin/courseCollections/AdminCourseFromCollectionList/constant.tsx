import { AdminCourseFromList } from "@entities/course";
import { getFullName } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "category.name", "teachers", "mrt-row-actions"];

export const columns: TColumns<AdminCourseFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название курса",
        accessorKey: "name",
        size: 454,
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
        size: 454,
    },
    {
        header: "Преподаватель",
        accessorKey: "teachers",
        enableSorting: false,
        size: 454,
        Cell: ({ row }) => row.original.teachers.map(({ profile }) => getFullName({ data: profile })).join(", "),
    },
];
