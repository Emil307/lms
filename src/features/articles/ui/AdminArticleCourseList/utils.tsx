import { useCallback, useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import { AdminCourseFromList, GetAdminCoursesRequest } from "@entities/course";
import { AdminArticleMaterialsExtraFilters } from "@entities/storage";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { RoleName, Roles } from "@shared/types";

export const useArticleCoursesListData = (userRole?: RoleName) => {
    const columns: TColumns<AdminCourseFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 140,
            },
            {
                header: "Название",
                accessorKey: "name",
                maxSize: 678,
            },
            {
                header: "Категория курса",
                accessorKey: "category.name",
                maxSize: 678,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return ["id", "name", "category.name", "mrt-row-actions"];
    }, []);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<AdminCourseFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const adaptGetArticleCoursesRequest = (params: TFunctionParams<unknown, AdminArticleMaterialsExtraFilters>): GetAdminCoursesRequest => {
        const { articleId, ...rest } = params;

        return {
            ...rest,
            filter: {
                articleIds: articleId,
            },
        };
    };

    return { columns, columnOrder, renderBadge, adaptGetArticleCoursesRequest };
};
