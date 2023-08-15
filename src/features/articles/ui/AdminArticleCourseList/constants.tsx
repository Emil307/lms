import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = ["id", "name", "category.name", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Название",
        accessorKey: "name",
        maxSize: 678,
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
        maxSize: 678,
    },
];
