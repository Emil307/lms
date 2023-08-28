import { MRT_ColumnDef } from "mantine-react-table";
import { Badge } from "@mantine/core";
import { AdminGroupStudentFromList } from "@entities/group";
import { getFullName } from "@shared/utils";
import { useCellStyles } from "./StudentList.styles";

export const columnOrder = ["profile", "lessons", "tests", "homeworks", "status.name", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminGroupStudentFromList>["columns"] = [
    {
        header: "Ученик",
        accessorKey: "profile",
        size: 339,
        accessorFn: ({ profile }) => getFullName({ data: profile }),
    },
    {
        header: "Пройдено уроков",
        accessorKey: "lessons",
        accessorFn: ({ lessons }) => `${lessons.completedCount}/${lessons.totalCount}`,
    },
    {
        header: "Выполнено тестов",
        accessorKey: "tests",
        accessorFn: ({ tests }) => `${tests.completedCount}/${tests.totalCount}`,
    },
    {
        header: "Выполнено заданий",
        accessorKey: "homeworks",
        accessorFn: ({ homeworks }) => `${homeworks.completedCount}/${homeworks.totalCount}`,
    },
    {
        header: "Статус",
        accessorKey: "status.name",
        size: 140,
        Cell: ({ row }) => {
            const { classes } = useCellStyles({ statusType: row.original.status.name });
            return <Badge className={classes.status}>{row.original.status.displayName}</Badge>;
        },
    },
];
