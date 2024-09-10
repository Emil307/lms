import dayjs from "dayjs";
import { z } from "zod";
import { useCallback, useMemo } from "react";
import { MRT_Cell } from "mantine-react-table";
import { TColumns, TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCourseFromList, AdminCoursesFiltersForm, GetAdminCoursesRequest, useAdminCourseResources } from "@entities/course";
import { prepareOptionsForSelect } from "@shared/ui";
import { getHumanDate, getLocaleString, getSurnameWithInitials } from "@shared/utils";
import { FilterTypes } from "@shared/constant";
import { RoleName, Roles } from "@shared/types";

export const useCourseListData = (userRole?: RoleName) => {
    const { data: coursesFilters, isLoading: isLoadingFilters } = useAdminCourseResources({ type: FilterTypes.SELECT });

    const columns: TColumns<AdminCourseFromList> = useMemo(() => {
        return [
            {
                header: "ID",
                accessorKey: "id",
                size: 120,
            },
            {
                header: "Название",
                accessorKey: "name",
                size: 170,
            },
            {
                header: "Категория",
                accessorKey: "category",
                id: "category.name",
                Cell: ({ cell }) => <>{cell.row.original.category?.name}</>,
                size: 170,
            },
            {
                header: "Теги",
                accessorKey: "tags",
                Cell: ({ cell }) => <>{cell.row.original.tags.map((tag) => tag.name).join(", ")}</>,
                enableSorting: false,
                size: 160,
            },
            {
                header: "Дата создания",
                accessorKey: "createdAt",
                access: [Roles.administrator, Roles.manager],
                Cell: ({ cell }) => (
                    <>
                        {getHumanDate(cell.getValue() as Date, {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </>
                ),
                size: 160,
            },
            {
                header: "Преподаватели",
                accessorKey: "teachers",
                Cell: ({ cell }) => <>{cell.row.original.teachers.map((teacher) => getSurnameWithInitials(teacher.profile)).join(", ")}</>,
                enableSorting: false,
                size: 170,
            },
            {
                header: "Стоимость",
                accessorKey: "price",
                Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.price })}</>,
                size: 160,
            },
            {
                header: "Скидка",
                accessorKey: "discount",
                id: "discount.amount",
                Cell: ({ cell }) => (
                    <>{getLocaleString({ number: cell.row.original.discount?.amount, type: cell.row.original.discount?.type })}</>
                ),
                size: 160,
            },
            {
                header: "Стоимость со скидкой",
                accessorKey: "discountPrice",
                Cell: ({ cell }) => <>{getLocaleString({ number: cell.row.original.discountPrice })}</>,
                size: 208,
            },
        ];
    }, []);

    const columnOrder = useMemo(() => {
        return [
            "id",
            "name",
            "category.name",
            "tags",
            "createdAt",
            "teachers",
            "price",
            "discount.amount",
            "discountPrice",
            "mrt-row-actions",
        ];
    }, [userRole]);

    const filterInitialValues: Partial<AdminCoursesFiltersForm> = useMemo(() => {
        if (userRole === Roles.teacher) {
            return { query: "", tags: [], category: "", discountType: "" };
        }
        return { query: "", createdAtFrom: null, createdAtTo: null, isActive: "", tags: [], teachers: [], category: "", discountType: "" };
    }, [userRole]);

    const renderBadge = useCallback(() => {
        if (userRole === Roles.teacher) {
            return undefined;
        }
        return (cell: MRT_Cell<AdminCourseFromList>) => [{ condition: !!cell.row.original.isActive }];
    }, [userRole]);

    const optionsForSelects = useMemo(() => {
        const categories = prepareOptionsForSelect({
            data: coursesFilters?.categories,
            value: "id",
            label: "name",
            emptyOptionLabel: "Без категории",
        });
        const tags = prepareOptionsForSelect({
            data: coursesFilters?.tags,
            value: "id",
            label: "name",
        });
        const teachers = prepareOptionsForSelect({
            data: coursesFilters?.teachers,
            value: "id",
            label: (data) => `${data.profile?.lastName} ${data.profile?.firstName}`,
        });
        const discountTypes = prepareOptionsForSelect({
            data: coursesFilters?.discountTypes,
            value: "type",
            label: "name",
        });

        return { categories, tags, teachers, discountTypes };
    }, [coursesFilters]);

    const adaptGetAdminCoursesRequest = (params: TFunctionParams<AdminCoursesFiltersForm>): GetAdminCoursesRequest => {
        const { createdAtFrom, createdAtTo, tags = [], teachers = [], discountType, isActive, category, ...rest } = params;

        const filter: any = {};

        // Проверка и добавление поля isActive
        if (z.coerce.number().safeParse(isActive).success) {
            filter.isActive = isActive === "1";
        }

        // Проверка и добавление поля discountType
        if (discountType) {
            filter["discount.type"] = discountType;
        }

        // Проверка и добавление поля category
        if (category && category !== "null") {
            filter["category.id"] = category;
        } else if (category === "null") {
            filter["category.id"] = {
                items: [null],
                operator: "and",
            };
        }

        // Проверка и добавление тегов
        if (tags.length > 0) {
            filter.tagIds = {
                items: tags,
                operator: "or",
            };
        }

        // Проверка и добавление учителей
        if (teachers.length > 0) {
            filter.teacherIds = {
                items: teachers,
                operator: "or",
            };
        }

        // Проверка и добавление диапазона дат
        if (createdAtFrom && createdAtTo) {
            filter.createdAt = {
                items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                operator: "range",
            };
        }

        return {
            ...rest,
            filter,
        };
    };

    return { columns, columnOrder, filterInitialValues, renderBadge, adaptGetAdminCoursesRequest, optionsForSelects, isLoadingFilters };
};
