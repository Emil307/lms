import { z } from "zod";
import { useCallback, useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminStudentsFiltersForm, GetAdminStudentsRequest, UserFromList } from "@entities/user";
import { Roles } from "@app/routes";
import { getFullName } from "@shared/utils";

export const useStudentListData = (userRole: number = 0) => {
    const columns: TColumns<UserFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 120,
            },
            {
                header: "ФИО",
                accessorKey: "profile",
                id: "fullName",
                size: 339,
                accessorFn: ({ profile }) => getFullName({ data: profile }),
            },
            {
                header: "Роль",
                accessorKey: "roles",
                id: "roleName",
                size: 339,
                accessorFn: ({ roles }) => roles[0].displayName,
            },
            {
                header: "Email",
                accessorKey: "email",
                size: 339,
            },
            {
                header: "Статус",
                accessorKey: "isActive",
                access: [Roles.administrator, Roles.manager],
                size: 339,
                Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return ["id", "fullName", "roleName", "email", "isActive", "mrt-row-actions"];
    }, []);

    const filterInitialValues: Partial<AdminStudentsFiltersForm> = useMemo(() => {
        if (userRole === Roles.teacher) {
            return { query: "", roleName: "" };
        }
        return { isActive: "", query: "", roleName: "" };
    }, [userRole]);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<UserFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const adaptGetAdminStudentsRequest = (params: TFunctionParams<AdminStudentsFiltersForm>): GetAdminStudentsRequest => {
        const { isActive, roleName, ...rest } = params;

        return {
            ...rest,
            filter: {
                roleName,
                ...(z.coerce.number().safeParse(isActive).success && {
                    isActive: isActive === "1",
                }),
            },
        };
    };

    return { columns, columnOrder, filterInitialValues, renderBadge, adaptGetAdminStudentsRequest };
};
