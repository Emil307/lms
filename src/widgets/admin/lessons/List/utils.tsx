import dayjs from "dayjs";
import { MRT_Cell } from "mantine-react-table";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { AdminLessonFromList, AdminLessonsFilters, GetAdminLessonsRequest } from "@entities/lesson";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { getHumanDate } from "@shared/utils";
import { Roles } from "@app/routes";

export const useLessonListData = (userRole?: number) => {
    const router = useRouter();

    const columns: TColumns<AdminLessonFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 120,
            },
            {
                header: "Название",
                accessorKey: "name",
                size: 339,
            },
            {
                header: "Описание",
                accessorKey: "description",
                size: 339,
            },
            {
                header: "Дата создания",
                accessorKey: "createdAt",
                access: [Roles.administrator, Roles.manager],
                Cell: ({ cell }) =>
                    getHumanDate(cell.getValue() as Date, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    }),
                size: 339,
            },
            {
                header: "Статус",
                accessorKey: "isActive",
                access: [Roles.administrator, Roles.manager],
                Cell: ({ cell }) => <>{cell.row.original.isActive ? "Активен" : "Не активен"}</>,
                size: 339,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return ["id", "name", "description", "createdAt", "isActive", "mrt-row-actions"];
    }, []);

    const filterInitialValues: Partial<AdminLessonsFilters> = useMemo(() => {
        if (userRole === Roles.teacher) {
            return { query: "" };
        }
        return { query: "", isActive: "", createdAtTo: null, createdAtFrom: null };
    }, [userRole]);

    const adaptGetAdminLessonsRequest = ({
        isActive,
        createdAtTo,
        createdAtFrom,
        ...rest
    }: TFunctionParams<AdminLessonsFilters>): GetAdminLessonsRequest => ({
        ...rest,
        filter: {
            isActive: isActive === "" ? undefined : isActive,
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),
        },
    });

    const openLessonDetails = (id: number) => {
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<AdminLessonFromList>) => {
        openLessonDetails(cell.row.original.id);
    };

    return { columns, columnOrder, filterInitialValues, adaptGetAdminLessonsRequest, handlerClickCell };
};
