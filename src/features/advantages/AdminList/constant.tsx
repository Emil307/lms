import { Advantage } from "@entities/staticPage";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["title", "description", "mrt-row-actions"];

export const columns: TColumns<Advantage> = [
    {
        header: "Заголовок",
        accessorKey: "title",
    },
    {
        header: "Пояснение",
        accessorKey: "description",
    },
];
