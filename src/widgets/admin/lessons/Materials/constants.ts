import { MRT_ColumnDef } from "mantine-react-table";
import { UploadedFileFromList } from "@entities/storage";
import { getFileSize } from "@shared/utils";

export const columnOrder = ["id", "name", "size", "mrt-row-actions"];

export const columns: MRT_ColumnDef<UploadedFileFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название",
        accessorKey: "name",
    },
    {
        header: "Объём",
        accessorKey: "size",
        accessorFn: ({ size }) => getFileSize(size),
    },
];
