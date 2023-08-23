import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminStudentArticlePackageFromList } from "@entities/articlePackage";

export const columnOrder = ["id", "name", "categories", "availableTo", "price", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminStudentArticlePackageFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Название пакета",
        accessorKey: "name",
        size: 438,
    },
    {
        header: "Категория",
        accessorKey: "categories",
        enableSorting: false,
        size: 438,
        accessorFn: ({ categories }) => categories.map(({ name }) => name).join(", "),
    },
    {
        header: "Доступ открыт",
        accessorKey: "availableTo",
        size: 240,
        accessorFn: ({ availableTo }) => (availableTo ? dayjs(availableTo).format("DD.MM.YYYY") : ""),
    },
    {
        header: "Стоимость пакета",
        accessorKey: "price",
        size: 240,
        accessorFn: ({ price }) => `${price.toLocaleString("ru")} ₽`,
    },
];
