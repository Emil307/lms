import { MRT_ColumnDef } from "mantine-react-table";
import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import { AdminTransactionFromList, AdminTransactionsFiltersForm } from "@entities/transaction";
import { getFullName } from "@shared/utils";
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

export const columns: MRT_ColumnDef<AdminTransactionFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Вид сущности",
        accessorKey: "entity.type",
        accessorFn: ({ entity }) => entity.type.name,
    },

    {
        header: "Название",
        accessorKey: "entity.name",
    },

    {
        header: "Ученик",
        accessorKey: "user",
        id: "user.fullName",
        accessorFn: ({ user }) => getFullName({ data: user.profile }),
    },

    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Вид оплаты",
        accessorKey: "paymentType.type",
        accessorFn: ({ paymentType }) => paymentType.name,
    },
    {
        header: "Стоимость",
        accessorKey: "amount",
        accessorFn: ({ amount }) => `${amount.toLocaleString("ru")} ₽`,
    },

    {
        header: "Статус платежа",
        accessorKey: "status.status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ status: row.original.status });
            return (
                <Badge variant="outline" className={classes.status}>
                    {row.original.status.name}
                </Badge>
            );
        },
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
