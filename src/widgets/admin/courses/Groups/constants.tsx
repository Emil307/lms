import { MRT_ColumnDef } from "mantine-react-table";
import { Badge, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { AdminGroupFromList } from "@entities/group";
import { getFullName } from "@shared/utils";
import useStyles from "./Groups.styles";

export const columnOrder = ["id", "createdAt", "name", "studentsCount", "educationFinishDate", "teacher", "status", "mrt-row-actions"];

export const columns: MRT_ColumnDef<AdminGroupFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
        size: 292,
    },
    {
        header: "Группа",
        accessorKey: "name",
        size: 160,
    },
    {
        header: "Учеников",
        accessorKey: "studentsCount",
        size: 160,
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
        size: 292,
    },
    {
        header: "Преподаватель",
        accessorKey: "teacher",
        accessorFn: ({ teacher }) => getFullName({ data: teacher?.profile }),
        size: 292,
    },
    {
        header: "Статус группы",
        accessorKey: "status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ statusType: row.original.status.type });
            return (
                //TODO: displayName как беки добавят
                <Badge className={classes.status}>{row.original.status.name}</Badge>
            );
        },
        size: 160,
    },
];
