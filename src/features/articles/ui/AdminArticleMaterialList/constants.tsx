import { MRT_ColumnDef } from "mantine-react-table";
import { UploadedFileFromList } from "@entities/storage";
import { getFileSize } from "@shared/utils";

export const columnOrder = ["id", "name", "size", "mrt-row-actions"];

export const columns: MRT_ColumnDef<UploadedFileFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 678,
    },
    {
        header: "Объем",
        accessorKey: "size",
        size: 678,
        accessorFn: (row) => getFileSize(row.size),
    },
];
