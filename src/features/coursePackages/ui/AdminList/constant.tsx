import { Flex } from "@mantine/core";
import dayjs from "dayjs";
import { AdminCoursePackageFromList, AdminCoursePackagesFiltersForm } from "@entities/coursePackage";
import { Paragraph, Tooltip } from "@shared/ui";
import { TColumns } from "@shared/ui/DataGrid/types";

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

export const columns: TColumns<AdminCoursePackageFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Название пакета",
        accessorKey: "name",
        size: 226,
    },
    {
        header: "Курсы, шт",
        accessorKey: "coursesCount",
        size: 226,
    },
    {
        header: "Полная стоимость",
        accessorKey: "price",
        size: 226,
        accessorFn: ({ price }) => `${price.toLocaleString("ru") || 0} ₽`,
    },
    {
        header: "Стоимость со скидкой",
        accessorKey: "discountPrice",
        size: 226,
        accessorFn: ({ discountPrice }) => (discountPrice ? `${discountPrice.toLocaleString("ru")} ₽` : ""),
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 226,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Скидка действует",
        accessorKey: "discount.finishingDate",
        size: 226,
        hideTooltip: true,
        Cell: ({ row }) => {
            const startDate = row.original.discount?.startingDate
                ? dayjs(row.original.discount.startingDate).format("DD.MM.YYYY")
                : undefined;
            const finishDate = row.original.discount?.finishingDate
                ? dayjs(row.original.discount.finishingDate).format("DD.MM.YYYY")
                : undefined;
            let resultString = "";
            if (!startDate && finishDate) {
                return undefined;
            }
            if (startDate) {
                resultString += `с ${startDate} `;
            }
            if (finishDate) {
                resultString += `до ${finishDate}`;
            }

            return (
                <Tooltip label={resultString}>
                    <Flex direction="column">
                        {startDate && <Paragraph variant="text-small-m" lineClamp={1}>{`с ${startDate}`}</Paragraph>}
                        {finishDate && <Paragraph variant="text-caption" color="gray45" lineClamp={1}>{`до ${finishDate}`}</Paragraph>}
                    </Flex>
                </Tooltip>
            );
        },
    },
];
