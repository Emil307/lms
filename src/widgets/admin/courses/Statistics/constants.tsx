import { Badge } from "@mantine/core";
import { AdminCourseStatistics } from "@entities/course";
import useStyles from "./Statistics.styles";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = [
    "name",
    "completedLessonsPercent",
    "completedLessonTestsPercent",
    "completedLessonHomeworksPercent",
    "status",
    "mrt-row-actions",
];

export const columns: TColumns<AdminCourseStatistics> = [
    {
        header: "Группа",
        accessorKey: "name",
        size: 330,
    },
    {
        header: "Пройдено уроков, %",
        accessorKey: "completedLessonsPercent",
        size: 330,
    },
    {
        header: "Пройдено тестов, %",
        accessorKey: "completedLessonTestsPercent",
        size: 330,
    },
    {
        header: "Пройдено заданий, %",
        accessorKey: "completedLessonHomeworksPercent",
        size: 330,
    },
    {
        header: "Статус группы",
        accessorKey: "status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ statusType: row.original.status.name });
            return <Badge className={classes.status}>{row.original.status.displayName}</Badge>;
        },
        size: 140,
    },
];
