import { MRT_ColumnDef } from "mantine-react-table";
import { UploadedFileFromList } from "@entities/storage";

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
    //TODO: https://gitlab.addamant-work.ru/business-gallery/business-gallery-back/-/issues/132
    // {
    //     header: "Объем",
    //     accessorKey: "size",
    //     accessorFn: (row) => getFileSize(row.size),
    // },
];
