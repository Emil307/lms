import { MRT_ColumnDef } from "mantine-react-table";
import { AdminGroupParticipantFromList } from "@entities/group";
import { getFullName } from "@shared/utils";

export const columnOrder = [
    "profile",
    "lessons",
    "tests",
    "homeworks",
    // "status",
    // "isActive",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminGroupParticipantFromList>["columns"] = [
    {
        header: "Ученик",
        accessorKey: "profile",
        accessorFn: ({ profile }) => getFullName({ data: profile }),
    },
    {
        header: "Пройдено уроков",
        accessorKey: "lessons",
        accessorFn: ({ lessons }) => `${lessons.completed}/${lessons.total}`,
    },
    {
        header: "Выполнено тестов",
        accessorKey: "tests",
        accessorFn: ({ tests }) => `${tests.completed}/${tests.total}`,
    },
    {
        header: "Выполнено заданий",
        accessorKey: "homeworks",
        accessorFn: ({ homeworks }) => `${homeworks.completed}/${homeworks.total}`,
    },
    //TODO: https://gitlab.addamant-work.ru/business-gallery/business-gallery-back/-/issues/160
    // {
    //     header: "Статус",
    //     accessorKey: "isActive",
    //     Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    // },
];
