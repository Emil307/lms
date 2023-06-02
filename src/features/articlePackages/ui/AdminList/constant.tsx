import { MRT_ColumnDef } from "mantine-react-table";
import { Flex, Text } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
import { AdminArticlePackageFromList, AdminArticlePackagesFiltersForm } from "@entities/articlePackage";
import { Tooltip } from "@shared/ui";
import useStyles from "./AdminList.styles";

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminArticlePackagesFiltersForm = {
    isActive: "",
    query: "",
    categoryId: "",
    createdAtFrom: null,
    createdAtTo: null,
    discountFinishingDate: null,
};

export const columnOrder = [
    "id",
    "name",
    "categories",
    "fullPrice",
    "discountPrice",
    "createdAt",
    "discount.finishingDate",
    "mrt-row-actions",
];

export const columns: MRT_ColumnDef<AdminArticlePackageFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Название пакета",
        accessorKey: "name",
        Cell: ({ cell }) => (
            <Tooltip label={cell.getValue() as string}>
                <Text lineClamp={1}>{cell.getValue() as string}</Text>
            </Tooltip>
        ),
    },
    {
        header: "Категории",
        accessorKey: "categories",
        enableSorting: false,
        Cell: ({ row }) => {
            const listCategoryNames = row.original.categories.map(({ name }) => name).join(", ");
            return (
                <Tooltip label={listCategoryNames}>
                    <Text lineClamp={1}>{listCategoryNames}</Text>
                </Tooltip>
            );
        },
    },
    {
        header: "Полная стоимость",
        accessorKey: "fullPrice",
        accessorFn: (row) => `${row.fullPrice.toLocaleString("ru") || 0} ₽`,
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
                        <Text className={classes.startingDate} lineClamp={1}>{`с ${getHumanDate(row.original.discount.startingDate, {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })}`}</Text>
                    )}
                    {row.original.discount?.finishingDate && (
                        <Text className={classes.finishingDate} lineClamp={1}>{`до ${getHumanDate(row.original.discount.finishingDate, {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })}`}</Text>
                    )}
                </Flex>
            );
        },
    },
];
