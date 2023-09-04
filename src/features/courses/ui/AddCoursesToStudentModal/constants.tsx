import { AdminCourseFromList } from "@entities/course";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["mrt-row-select", "id", "name", "discountPrice"];

export const columns: TColumns<AdminCourseFromList> = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Курс",
        accessorKey: "name",
    },
    {
        header: "Стоимость",
        accessorKey: "discountPrice",
        accessorFn: ({ discountPrice }) => `${discountPrice.toLocaleString("ru")} ₽`,
    },
];
