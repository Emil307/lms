import { UploadedFileFromList } from "@entities/storage";
import { getFileSize } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "size", "mrt-row-actions"];

export const columns: TColumns<UploadedFileFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
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
