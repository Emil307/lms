import { getHumanDate } from "@shared/utils";
import { AdminLessonFromList } from "@entities/lesson";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columns: TColumns<AdminLessonFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название",
        accessorKey: "name",
        size: 339,
    },
    {
        header: "Описание",
        accessorKey: "description",
        size: 339,
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
        size: 339,
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.row.original.isActive ? "Активен" : "Не активен"}</>,
        size: 339,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];
