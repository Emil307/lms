import { AdminCourseFromList } from "@entities/course";
import { getLocaleString } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "category.name", "price", "discountPrice", "mrt-row-actions"];

export const columns: TColumns<AdminCourseFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название курса",
        accessorKey: "name",
        size: 465,
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
        size: 465,
    },
    {
        header: "Стоимость",
        accessorKey: "price",
        size: 215,
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.price })}</>,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        size: 215,
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.discountPrice })}</>,
    },
];
