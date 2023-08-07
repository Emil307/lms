import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = ["mrt-row-select", "id", "name", "discountPrice"];

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
        header: "Стоимость",
        accessorKey: "discountPrice",
        accessorFn: ({ discountPrice }) => `${discountPrice.toLocaleString("ru")} ₽`,
    },
];
