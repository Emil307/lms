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
        size: 468,
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
        size: 468,
    },
    {
        header: "Стоимость",
        accessorKey: "price",
        size: 220,
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.price })}</>,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        size: 220,
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.discountPrice })}</>,
    },
];
