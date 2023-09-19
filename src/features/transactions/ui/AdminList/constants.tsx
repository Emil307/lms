import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import { AdminTransactionFromList, AdminTransactionsFiltersForm } from "@entities/transaction";
import { getFullName } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";
import useStyles from "./AdminList.styles";

export const columnOrder = [
    "id",
    "entity.type",
    "entity.name",
    "user.fullName",
    "createdAt",
    "paymentType.type",
    "amount",
    "status.status",
    "mrt-row-actions",
];

export const columns: TColumns<AdminTransactionFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "Вид сущности",
        accessorKey: "entity.type",
        accessorFn: ({ entity }) => entity.type.name,
        size: 238,
    },

    {
        header: "Название",
        accessorKey: "entity.name",
        size: 238,
    },

    {
        header: "Ученик",
        accessorKey: "user",
        id: "user.fullName",
        accessorFn: ({ user }) => getFullName({ data: user.profile }),
        size: 238,
    },

    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
        size: 160,
    },
    {
        header: "Вид оплаты",
        accessorKey: "paymentType.type",
        accessorFn: ({ paymentType }) => paymentType.name,
        size: 160,
    },
    {
        header: "Стоимость",
        accessorKey: "amount",
        accessorFn: ({ amount }) => `${amount.toLocaleString("ru")} ₽`,
        size: 160,
    },

    {
        header: "Статус платежа",
        accessorKey: "status.status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ status: row.original.status });
            return <Badge className={classes.status}>{row.original.status.name}</Badge>;
        },
        size: 160,
    },
];

export const filterInitialValues: AdminTransactionsFiltersForm = {
    query: "",
    entityType: "",
    paymentType: "",
    status: "",
    createdAtFrom: null,
    createdAtTo: null,
};
