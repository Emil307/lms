import { MRT_ColumnDef } from "mantine-react-table";
import { Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { getHumanDate } from "@shared/utils";
import { AdminCoursePackage, AdminCoursePackagesFiltersForm } from "@entities/coursePackage";
import useStyles from "./AdminList.styles";

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminCoursePackagesFiltersForm = {
    isActive: "",
    query: "",
    createdAtFrom: null,
    createdAtTo: null,
    courseIds: "",
    discountFinishingDateFrom: null,
    discountFinishingDateTo: null,
};

export const columnOrder = [
    "id",
    "name",
    "coursesCount",
    "price",
    "discountPrice",
    "createdAt",
    "discount.finishingDate",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminCoursePackage>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название пакета",
        accessorKey: "name",
    },
    {
        header: "Курсы, шт",
        accessorKey: "coursesCount",
    },
    {
        header: "Полная стоимость",
        accessorKey: "price",
        accessorFn: (row) => `${row.price.toLocaleString("ru") || 0} ₽`,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        accessorFn: (row) => (row.discountPrice ? `${row.discountPrice.toLocaleString("ru")} ₽` : ""),
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: (row) => getHumanDate(row.createdAt, { month: "2-digit", day: "2-digit", year: "numeric" }),
    },
    {
        header: "Скидка действует",
        accessorKey: "discount.finishingDate",
        Cell: ({ row }) => {
            const { classes } = useStyles();
            return (
                <Flex direction="column">
                    {row.original.discount?.startingDate && (
                        <Text className={classes.startingDate} lineClamp={1}>{`с ${dayjs(row.original.discount.startingDate).format(
                            "DD.MM.YYYY"
                        )}`}</Text>
                    )}
                    {row.original.discount?.finishingDate && (
                        <Text className={classes.finishingDate} lineClamp={1}>{`до ${dayjs(row.original.discount.finishingDate).format(
                            "DD.MM.YYYY"
                        )}`}</Text>
                    )}
                </Flex>
            );
        },
    },
];
