import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList } from "@entities/course";
import { getFullName } from "@shared/utils";

export const columnOrder = ["id", "name", "category.name", "teachers", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название курса",
        accessorKey: "name",
        size: 458,
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
        size: 458,
    },
    {
        header: "Преподаватель",
        accessorKey: "teachers",
        enableSorting: false,
        size: 458,
        Cell: ({ row }) => row.original.teachers.map(({ profile }) => getFullName({ data: profile })).join(", "),
    },
];
