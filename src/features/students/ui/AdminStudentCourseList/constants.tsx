import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = [
    "id",
    "name",
    "category.name",
    "accessExpirationDate",
    "createdAt",
    "isActive",
    "discountPrice",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 100,
    },
    {
        header: "Курс",
        accessorKey: "name",
        size: 376,
    },
    {
        header: "Категория",
        accessorKey: "category.name",
        size: 376,
    },
    {
        header: "Доступ открыт",
        accessorKey: "accessExpirationDate",
        size: 156,
        accessorFn: ({ accessExpirationDate }) => (accessExpirationDate ? dayjs(accessExpirationDate).format("DD.MM.YYYY") : ""),
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 156,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    { header: "Статус", accessorKey: "isActive", size: 156, Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</> },
    {
        header: "Стоимость",
        accessorKey: "discountPrice",
        size: 156,
        accessorFn: ({ discountPrice }) => `${discountPrice.toLocaleString("ru")} ₽`,
    },
];
