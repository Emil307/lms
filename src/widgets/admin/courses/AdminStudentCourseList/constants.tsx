import dayjs from "dayjs";
import { Badge } from "@mantine/core";
import { AdminStudentCourseFromList } from "@entities/course";
import { TColumns } from "@shared/ui/DataGrid/types";
import { useCellStyles } from "./AdminStudentCourseList.styles";

export const columnOrder = [
    "id",
    "name",
    "category.name",
    "accessExpirationDate",
    "createdAt",
    "status",
    "discountPrice",
    "mrt-row-actions",
];

export const columns: TColumns<AdminStudentCourseFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 100,
    },
    {
        header: "Курс",
        accessorKey: "name",
        size: 376,
    },
    {
        header: "Категория",
        accessorKey: "category.name",
        size: 376,
    },
    {
        header: "Доступ открыт",
        accessorKey: "accessExpirationDate",
        size: 156,
        accessorFn: ({ accessExpirationDate }) => (accessExpirationDate ? dayjs(accessExpirationDate).format("DD.MM.YYYY") : ""),
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        size: 156,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Статус",
        accessorKey: "status",
        hideTooltip: true,
        Cell: ({ row }) => {
            const { classes } = useCellStyles({ statusType: row.original.status?.name });
            if (!row.original.status) {
                return null;
            }
            return <Badge className={classes.status}>{row.original.status.displayName}</Badge>;
        },
        size: 156,
    },
    {
        header: "Стоимость",
        accessorKey: "discountPrice",
        size: 156,
        accessorFn: ({ discountPrice }) => `${discountPrice.toLocaleString("ru")} ₽`,
    },
];
