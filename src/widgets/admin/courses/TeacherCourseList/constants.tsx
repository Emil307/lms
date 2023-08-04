import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { AdminCourseFromList } from "@entities/course";

export const columnOrder = ["id", "name", "createdAt", "category.name", "isActive"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 115,
    },
    {
        header: "Название курса",
        accessorKey: "name",
        size: 560,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
        size: 156,
    },
    {
        header: "Категория",
        accessorKey: "category.name",
        size: 560,
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
        size: 156,
    },
];
