import dayjs from "dayjs";
import { AdminSubCategoryFromList } from "@entities/category";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "createdAt", "mrt-row-actions"];

export const columns: TColumns<AdminSubCategoryFromList> = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Подкатегория",
        accessorKey: "name",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];
