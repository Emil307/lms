import { MRT_ColumnDef } from "mantine-react-table";
import { Advantage } from "@entities/staticPage";

export const columnOrder = ["title", "description", "mrt-row-actions"];

export const columns: MRT_ColumnDef<Advantage>["columns"] = [
    {
        header: "Заголовок",
        accessorKey: "title",
    },
    {
        header: "Пояснение",
        accessorKey: "description",
    },
];
