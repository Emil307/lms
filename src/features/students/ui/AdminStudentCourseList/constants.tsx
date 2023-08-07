import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = ["id", "name", "category.name", "createdAt", "isActive", "discountPrice", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Курс",
        accessorKey: "name",
    },
    {
        header: "Категория",
        accessorKey: "category.name",
    },
    //TODO: Добавить столбец с датой открытия доступа к курсу https://addamant.planfix.ru/task/97191/?comment=8749867
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    { header: "Статус", accessorKey: "isActive", Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</> },
    {
        header: "Стоимость",
        accessorKey: "discountPrice",
        accessorFn: ({ discountPrice }) => `${discountPrice.toLocaleString("ru")} ₽`,
    },
];
