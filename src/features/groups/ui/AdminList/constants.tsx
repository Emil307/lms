import { MRT_ColumnDef } from "mantine-react-table";
import { Badge, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { AdminGroupFromList, AdminGroupsFiltersForm } from "@entities/group";
import { getFullName } from "@shared/utils";
import useStyles from "./AdminList.styles";

export const columnOrder = [
    "id",
    "course.name",
    "createdAt",
    "name",
    "studentsCount",
    "educationFinishDate",
    "teacher",
    "status",
    "isActive",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminGroupFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Учебный курс",
        accessorKey: "course.name",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Группа",
        accessorKey: "name",
    },
    {
        header: "Учеников",
        accessorKey: "studentsCount",
    },
    {
        header: "Даты обучения",
        accessorKey: "educationFinishDate",
        Cell: ({ row }) => {
            const { classes } = useStyles({});
            return (
                <Flex direction="column">
                    <Text className={classes.educationStartDate}>{`c ${dayjs(row.original.educationStartDate).format("DD.MM.YYYY")}`}</Text>
                    <Text className={classes.educationFinishDate}>
                        {`до ${dayjs(row.original.educationFinishDate).format("DD.MM.YYYY")}`}
                    </Text>
                </Flex>
            );
        },
    },
    {
        header: "Преподаватель",
        accessorKey: "teacher",
        accessorFn: ({ teacher }) => getFullName({ data: teacher?.profile }),
    },
    {
        header: "Статус группы",
        accessorKey: "status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ statusType: row.original.status.type });
            return (
                //TODO: displayName как беки добавят
                <Badge variant="outline" className={classes.status}>
                    {row.original.status.name}
                </Badge>
            );
        },
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminGroupsFiltersForm = {
    query: "",
    isActive: "",
    courseId: "",
    teacherId: "",
    createdAtFrom: null,
    createdAtTo: null,
    statusType: "",
};
