import dayjs from "dayjs";
import { z } from "zod";
import { useCallback, useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import { Badge, Flex } from "@mantine/core";
import { AdminGroupFromList, AdminGroupsFiltersForm, GetAdminGroupsRequest } from "@entities/group";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { Roles } from "@app/routes";
import { Paragraph, Tooltip } from "@shared/ui";
import { getFullName } from "@shared/utils";
import { useCellStyles } from "@features/groups/ui/AdminList/AdminList.styles";

export const useGroupListData = (userRole: number = 0) => {
    const columns: TColumns<AdminGroupFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 120,
            },
            {
                header: "Учебный курс",
                accessorKey: "course.name",
                size: 198,
            },
            {
                header: "Дата создания",
                accessorKey: "createdAt",
                access: [Roles.administrator, Roles.manager],
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
                hideTooltip: true,
                Cell: ({ row }) => {
                    const startDate = dayjs(row.original.educationStartDate).format("DD.MM.YYYY");
                    const endDate = dayjs(row.original.educationFinishDate).format("DD.MM.YYYY");

                    return (
                        <Tooltip label={`c ${startDate} до ${endDate}`} position="top">
                            <Flex direction="column">
                                <Paragraph variant="text-small-m">{`c ${startDate}`}</Paragraph>
                                <Paragraph variant="text-caption" color="gray45">
                                    {`до ${endDate}`}
                                </Paragraph>
                            </Flex>
                        </Tooltip>
                    );
                },
            },
            {
                header: "Преподаватель",
                accessorKey: "teacher",
                id: "teacher.profile.fullName",
                access: [Roles.administrator, Roles.manager],
                size: 198,
                accessorFn: ({ teacher }) => getFullName({ data: teacher?.profile }),
            },
            {
                header: "Статус группы",
                accessorKey: "status.name",
                size: 160,
                hideTooltip: true,
                Cell: ({ row }) => {
                    const { classes } = useCellStyles({ statusType: row.original.status.type });
                    return <Badge className={classes.status}>{row.original.status.name}</Badge>;
                },
            },
            {
                header: "Статус",
                accessorKey: "isActive",
                access: [Roles.administrator, Roles.manager],
                size: 160,
                Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return [
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
    }, [userRole]);

    const filterInitialValues: Partial<AdminGroupsFiltersForm> = useMemo(() => {
        if (userRole === Roles.teacher) {
            return { query: "", courseId: "", statusType: "" };
        }
        return { query: "", isActive: "", courseId: "", teacherId: "", createdAtFrom: null, createdAtTo: null, statusType: "" };
    }, [userRole]);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<AdminGroupFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const adaptGetAdminGroupsRequest = (params: TFunctionParams<AdminGroupsFiltersForm>): GetAdminGroupsRequest => {
        const { isActive, courseId, teacherId, createdAtFrom, createdAtTo, statusType, ...rest } = params;

        return {
            ...rest,
            filter: {
                "course.id": courseId,
                "teacher.id": teacherId,
                "status.type": statusType,
                ...(z.coerce.number().safeParse(isActive).success && {
                    isActive: isActive === "1",
                }),
                ...(createdAtFrom &&
                    createdAtTo && {
                        createdAt: {
                            items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                            operator: "range",
                        },
                    }),
            },
        };
    };

    return { columns, columnOrder, filterInitialValues, renderBadge, adaptGetAdminGroupsRequest };
};
