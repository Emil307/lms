import { MRT_ColumnDef } from "mantine-react-table";
import { AdminCourseFromList } from "@entities/course";
import { getLocaleString } from "@shared/utils";

export const columnOrder = ["id", "name", "category.name", "price", "discountPrice", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название курса",
        accessorKey: "name",
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
    },
    {
        header: "Стоимость",
        accessorKey: "price",
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.price })}</>,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.discountPrice })}</>,
    },
];
