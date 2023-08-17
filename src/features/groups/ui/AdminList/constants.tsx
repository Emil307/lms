import { MRT_ColumnDef } from "mantine-react-table";
import { Badge, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { AdminGroupFromList, AdminGroupsFiltersForm } from "@entities/group";
import { getFullName } from "@shared/utils";
import { Paragraph } from "@shared/ui";
import { useCellStyles } from "./AdminList.styles";

export const columnOrder = [
    "id",
    "course.name",
    "createdAt",
    "name",
    "studentsCount",
    "educationFinishDate",
    "teacher.profile.fullName",
    "status.name",
    "isActive",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminGroupFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "Учебный курс",
        accessorKey: "course.name",
        size: 198,
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 160,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
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
        size: 160,
        Cell: ({ row }) => {
            return (
                <Flex direction="column">
                    <Paragraph variant="text-small-m">{`c ${dayjs(row.original.educationStartDate).format("DD.MM.YYYY")}`}</Paragraph>
                    <Paragraph variant="text-caption" color="gray45">
                        {`до ${dayjs(row.original.educationFinishDate).format("DD.MM.YYYY")}`}
                    </Paragraph>
                </Flex>
            );
        },
    },
    {
        header: "Преподаватель",
        accessorKey: "teacher",
        id: "teacher.profile.fullName",
        size: 198,
        accessorFn: ({ teacher }) => getFullName({ data: teacher?.profile }),
    },
    {
        header: "Статус группы",
        accessorKey: "status.name",
        size: 160,
        Cell: ({ row }) => {
            const { classes } = useCellStyles({ statusType: row.original.status.type });
            return <Badge className={classes.status}>{row.original.status.name}</Badge>;
        },
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        size: 160,
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
