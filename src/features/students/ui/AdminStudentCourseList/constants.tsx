import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = ["id", "name", "category.name", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название курса",
        accessorKey: "name",
    },
    {
        header: "Категория",
        accessorKey: "category.name",
    },
];
