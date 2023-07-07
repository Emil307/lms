import { MRT_ColumnDef } from "mantine-react-table";
import { Text } from "@mantine/core";
import { Tooltip } from "@shared/ui";
import { AdminCourseFromList } from "@entities/course";
import { getFullName } from "@shared/utils";

export const columnOrder = ["id", "name", "category.name", "teachers", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminCourseFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название курса",
        accessorKey: "name",
    },
    {
        header: "Категория курса",
        accessorKey: "category.name",
    },
    {
        header: "Преподаватель",
        accessorKey: "teachers",
        enableSorting: false,
        Cell: ({ row }) => {
            const listTeachersNames = row.original.teachers.map(({ profile }) => getFullName({ data: profile })).join(", ");
            return (
                <Tooltip label={listTeachersNames}>
                    <Text lineClamp={1}>{listTeachersNames}</Text>
                </Tooltip>
            );
        },
    },
];
