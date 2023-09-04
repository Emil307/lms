import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticleFromList, AdminCourseArticleExtraFilters, GetAdminArticlesRequest } from "@entities/article";
import { useCallback, useMemo } from "react";
import { Roles } from "@app/routes";
import { MRT_Cell } from "mantine-react-table";

export const useCourseArticlesListData = (userRole: number = 0) => {
    const columns: TColumns<AdminArticleFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 120,
            },
            {
                header: "Статья",
                accessorKey: "name",
                size: 398,
            },
            {
                header: "Категория",
                accessorKey: "category.name",
                size: 398,
            },
            {
                header: "Подкатегория",
                accessorKey: "subcategories",
                enableSorting: false,
                size: 398,
                Cell: ({ row }) => row.original.subcategories.map(({ name }) => name).join(", "),
            },

            {
                header: "Статус",
                accessorKey: "isActive",
                access: [Roles.administrator, Roles.manager],
                accessorFn: ({ isActive }) => (isActive ? "Активен" : "Неактивен"),
                size: 160,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return ["id", "name", "category.name", "subcategories", "isActive", "mrt-row-actions"];
    }, []);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<AdminArticleFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const adaptGetAdminCourseArticlesRequest = (
        params: TFunctionParams<unknown, AdminCourseArticleExtraFilters>
    ): GetAdminArticlesRequest => {
        const { courseId, ...rest } = params;

        return {
            ...rest,
            filter: {
                courseIds: courseId,
            },
        };
    };

    return { columns, columnOrder, renderBadge, adaptGetAdminCourseArticlesRequest };
};
