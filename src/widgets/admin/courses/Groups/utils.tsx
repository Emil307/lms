import { useCallback, useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import dayjs from "dayjs";
import { Badge, Flex, Text } from "@mantine/core";
import { getFullName } from "@shared/utils";
import useStyles from "@widgets/admin/courses/Groups/Groups.styles";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminGroupFromList, GetAdminGroupsRequest } from "@entities/group";
import { RoleName, Roles } from "@shared/types";
import { TCourseGroupsExtraParams } from "./types";

export const useCourseGroupsListData = (userRole?: RoleName) => {
    const columns: TColumns<AdminGroupFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 120,
            },
            {
                header: "Дата создания",
                accessorKey: "createdAt",
                access: [Roles.administrator, Roles.manager],
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
                            <Text className={classes.educationStartDate}>{`c ${dayjs(row.original.educationStartDate).format(
                                "DD.MM.YYYY"
                            )}`}</Text>
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
                access: [Roles.administrator, Roles.manager],
                accessorFn: ({ teacher }) => getFullName({ data: teacher?.profile }),
                size: 292,
            },
            {
                header: "Статус группы",
                accessorKey: "status",
                hideTooltip: true,
                Cell: ({ row }) => {
                    const { classes } = useStyles({ statusType: row.original.status.type });
                    return <Badge className={classes.status}>{row.original.status.name}</Badge>;
                },
                size: 160,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return ["id", "createdAt", "name", "studentsCount", "educationFinishDate", "teacher", "status", "mrt-row-actions"];
    }, []);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<AdminGroupFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const adaptGetAdminGroupsRequest = (params: TFunctionParams<unknown, TCourseGroupsExtraParams>): GetAdminGroupsRequest => {
        const { courseId, ...rest } = params;

        return {
            ...rest,
            filter: {
                "course.id": courseId,
            },
        };
    };

    return { columns, columnOrder, renderBadge, adaptGetAdminGroupsRequest };
};
