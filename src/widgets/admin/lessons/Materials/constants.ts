import { UploadedFileFromList } from "@entities/storage";
import { getFileSize } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "size", "mrt-row-actions"];

export const columns: TColumns<UploadedFileFromList> = [
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
