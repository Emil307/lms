import { MRT_ColumnDef } from "mantine-react-table";
import { Flex } from "@mantine/core";
import dayjs from "dayjs";
import { AdminArticlePackageFromList, AdminArticlePackagesFiltersForm } from "@entities/articlePackage";
import { Paragraph } from "@shared/ui";

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
    discountFinishingDateFrom: null,
    discountFinishingDateTo: null,
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
        size: 140,
    },
    {
        header: "Название пакета",
        accessorKey: "name",
        size: 229,
    },
    {
        header: "Категории",
        accessorKey: "categories",
        enableSorting: false,
        size: 229,
        accessorFn: ({ categories }) => categories.map(({ name }) => name).join(", "),
    },
    {
        header: "Полная стоимость",
        accessorKey: "fullPrice",
        size: 229,
        accessorFn: ({ fullPrice }) => `${fullPrice.toLocaleString("ru") || 0} ₽`,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        size: 229,
        accessorFn: ({ discountPrice }) => (discountPrice ? `${discountPrice.toLocaleString("ru")} ₽` : ""),
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 220,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Скидка действует",
        accessorKey: "discount.finishingDate",
        size: 220,
        Cell: ({ row }) => {
            return (
                <Flex direction="column">
                    {row.original.discount?.startingDate && (
                        <Paragraph variant="text-small-m" lineClamp={1}>{`с ${dayjs(row.original.discount.startingDate).format(
                            "DD.MM.YYYY"
                        )}`}</Paragraph>
                    )}
                    {row.original.discount?.finishingDate && (
                        <Paragraph variant="text-caption" color="gray45" lineClamp={1}>{`до ${dayjs(
                            row.original.discount.finishingDate
                        ).format("DD.MM.YYYY")}`}</Paragraph>
                    )}
                </Flex>
            );
        },
    },
];
