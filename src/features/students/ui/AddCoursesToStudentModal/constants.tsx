import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = ["mrt-row-select", "id", "name", "category.name", "subcategory.name"];

//TODO: Обновить колонки после фиксов бека
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
