import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminSubCategoryFromList } from "@entities/category";

export const columnOrder = ["id", "name", "createdAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminSubCategoryFromList>["columns"] = [
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
