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
    },
    {
        header: "Курс",
        accessorKey: "name",
    },
    {
        header: "Категория",
        accessorKey: "category.name",
    },
    {
        header: "Доступ открыт",
        accessorKey: "accessExpirationDate",
        accessorFn: ({ accessExpirationDate }) => (accessExpirationDate ? dayjs(accessExpirationDate).format("DD.MM.YYYY") : ""),
    },
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
