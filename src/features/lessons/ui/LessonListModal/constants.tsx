import { MRT_ColumnDef } from "mantine-react-table";
import { getHumanDate } from "@shared/utils";
import { AdminLessonFromList, AdminSelectLessonsFilters } from "@entities/lesson";

export const columns: MRT_ColumnDef<AdminLessonFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 80,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 180,
    },
    {
        header: "Описание",
        accessorKey: "description",
        size: 180,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        Cell: ({ cell }) =>
            getHumanDate(cell.getValue() as Date, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
        size: 180,
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.row.original.isActive ? "Активен" : "Не активен"}</>,
    },
];

export const filterInitialValues: AdminSelectLessonsFilters = {
    query: "",
    createdAtFrom: null,
    createdAtTo: null,
};