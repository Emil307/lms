import dayjs from "dayjs";
import { AdminStudentArticlePackageFromList } from "@entities/articlePackage";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "name", "categories", "availableFrom", "fullPrice", "mrt-row-actions"];

export const columns: TColumns<AdminStudentArticlePackageFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
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
        accessorKey: "availableFrom",
        size: 240,
        accessorFn: ({ availableFrom }) => (availableFrom ? dayjs(availableFrom).format("DD.MM.YYYY") : ""),
    },
    {
        header: "Стоимость пакета",
        accessorKey: "fullPrice",
        size: 240,
        accessorFn: ({ fullPrice }) => `${fullPrice.toLocaleString("ru")} ₽`,
    },
];
