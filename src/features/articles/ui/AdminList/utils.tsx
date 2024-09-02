import { z } from "zod";
import { useCallback, useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import { AdminArticleFromList, AdminArticlesFiltersForm, GetAdminArticlesRequest } from "@entities/article";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { RoleName, Roles } from "@shared/types";

export const useArticleListData = (userRole?: RoleName) => {
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
                size: 299,
            },

            {
                header: "Категория",
                accessorKey: "category.name",
                size: 299,
                accessorFn: (row) => row.category?.name || "",
            },
            {
                header: "Подкатегория",
                accessorKey: "subcategories",
                enableSorting: false,
                size: 299,
                accessorFn: (row) => row.subcategories.map(({ name }) => name).join(", "),
            },

            {
                header: "Учебный курс",
                accessorKey: "courses",
                enableSorting: false,
                size: 299,
                accessorFn: (row) => row.courses.map(({ name }) => name).join(", "),
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
        return ["id", "name", "category.name", "subcategories", "courses", "isActive", "mrt-row-actions"];
    }, [userRole]);

    const filterInitialValues: Partial<AdminArticlesFiltersForm> = useMemo(() => {
        if (userRole === Roles.teacher) {
            return { query: "", categoryId: "", subcategoryId: "", courseIds: "" };
        }
        return { isActive: "", query: "", categoryId: "", subcategoryId: "", courseIds: "" };
    }, [userRole]);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<AdminArticleFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const adaptGetAdminArticlesRequest = (params: TFunctionParams<AdminArticlesFiltersForm>): GetAdminArticlesRequest => {
        const { isActive, categoryId, subcategoryId, courseIds, ...rest } = params;

        return {
            ...rest,
            filter: {
                ...(z.coerce.number().safeParse(isActive).success && {
                    isActive: isActive === "1",
                }),
                "category.id": categoryId,
                subcategoryIds: subcategoryId,
                courseIds,
            },
        };
    };

    return { columns, columnOrder, filterInitialValues, renderBadge, adaptGetAdminArticlesRequest };
};
