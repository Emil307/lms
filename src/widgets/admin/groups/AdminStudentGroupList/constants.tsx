import dayjs from "dayjs";
import { Badge } from "@mantine/core";
import { AdminStudentGroupFromList } from "@entities/group";
import { TColumns } from "@shared/ui/DataGrid/types";
import { useCellStyles } from "./AdminStudentGroupList.styles";

export const columnOrder = ["id", "name", "course.name", "accessExpirationDate", "createdAt", "status", "mrt-row-actions"];

export const columns: TColumns<AdminStudentGroupFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Номер группы",
        accessorKey: "name",
        size: 240,
    },
    {
        header: "Название курса",
        accessorKey: "course.name",
        size: 636,
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
];
