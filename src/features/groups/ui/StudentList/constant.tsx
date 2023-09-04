import { Badge } from "@mantine/core";
import { AdminGroupStudentFromList } from "@entities/group";
import { getFullName } from "@shared/utils";
import { useCellStyles } from "./StudentList.styles";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = [
    "fullName",
    "completedLessonsCount",
    "completedLessonTestsCount",
    "completedLessonHomeworksCount",
    "status",
    "mrt-row-actions",
];

export const columns: TColumns<AdminGroupStudentFromList> = [
    {
        header: "Ученик",
        accessorKey: "profile",
        id: "fullName",
        size: 339,
        accessorFn: ({ profile }) => getFullName({ data: profile }),
    },
    {
        header: "Пройдено уроков",
        accessorKey: "lessons",
        id: "completedLessonsCount",
        accessorFn: ({ lessons }) => `${lessons.completedCount}/${lessons.totalCount}`,
    },
    {
        header: "Выполнено тестов",
        accessorKey: "tests",
        id: "completedLessonTestsCount",
        accessorFn: ({ tests }) => `${tests.completedCount}/${tests.totalCount}`,
    },
    {
        header: "Выполнено заданий",
        accessorKey: "homeworks",
        id: "completedLessonHomeworksCount",
        accessorFn: ({ homeworks }) => `${homeworks.completedCount}/${homeworks.totalCount}`,
    },
    {
        header: "Статус",
        accessorKey: "status",
        size: 140,
        Cell: ({ row }) => {
            const { classes } = useCellStyles({ statusType: row.original.status.name });
            return <Badge className={classes.status}>{row.original.status.displayName}</Badge>;
        },
    },
];
