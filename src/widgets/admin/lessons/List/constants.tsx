import { MRT_ColumnDef } from "mantine-react-table";
import { getHumanDate } from "@shared/utils";
import { AdminLessonFromList, AdminLessonsFilters } from "@entities/lesson";

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

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminLessonsFilters = { query: "", isActive: "", createdAtTo: null, createdAtFrom: null };
