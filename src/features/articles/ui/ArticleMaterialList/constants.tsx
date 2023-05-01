import { MRT_ColumnDef } from "mantine-react-table";
import { AdminArticleMaterial } from "@entities/article";
import { getFileSize } from "@shared/utils";

export const columnOrder = ["id", "name", "size", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminArticleMaterial>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название",
        accessorKey: "name",
    },

    {
        header: "Объем",
        accessorKey: "size",
        accessorFn: (row) => getFileSize(row.size),
    },
];
