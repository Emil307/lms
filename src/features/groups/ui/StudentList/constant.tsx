import { MRT_ColumnDef } from "mantine-react-table";
import { Flex, Text } from "@mantine/core";
import { Group } from "@entities/group";
import { getHumanDate } from "@shared/utils";

export const columns: MRT_ColumnDef<Group>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Учебный курс",
        accessorKey: "courseName",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        Cell: ({ cell }) => (
            <>
                {getHumanDate(new Date(cell.getValue() as string), {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
    },
    {
        header: "Группа",
        accessorKey: "name",
    },
    {
        header: "Учеников",
        accessorKey: "students",
    },
    {
        header: "Даты обучения",
        accessorKey: "education",
        accessorFn: (row) => (
            <Flex direction="column">
                <Text sx={(theme) => ({ fontWeight: 500, fontSize: 14, lineHeight: "16px", color: theme.colors.dark[0] })}>
                    {`c ${getHumanDate(new Date(row.education.from), {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}`}
                </Text>
                <Text sx={(theme) => ({ fontWeight: 500, fontSize: 12, lineHeight: "16px", color: theme.colors.gray45[0] })}>
                    {`до ${getHumanDate(new Date(row.education.to), {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}`}
                </Text>
            </Flex>
        ),
    },
    {
        header: "Преподаватель",
        accessorKey: "teacherFullName",
    },
    {
        header: "Статус группы",
        accessorKey: "status",
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];
