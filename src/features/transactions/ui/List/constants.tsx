import { MRT_ColumnDef } from "mantine-react-table";
import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import { TransactionFromList, TransactionsFiltersForm } from "@entities/transaction";
import useStyles from "./List.styles";

export const columnOrder = ["entity.type", "entity.name", "createdAt", "paymentType", "amount", "status"];

export const columns: MRT_ColumnDef<TransactionFromList>["columns"] = [
    {
        header: "Вид сущности",
        accessorKey: "entity.type.name",
    },
    {
        header: "Название",
        accessorKey: "entity.name",
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
    {
        header: "Вид оплаты",
        accessorKey: "paymentType",
        accessorFn: ({ paymentType }) => paymentType.name,
    },
    {
        header: "Стоимость",
        accessorKey: "amount",
        accessorFn: ({ amount }) => `${amount.toLocaleString("ru")} ₽`,
    },

    {
        header: "Статус платежа",
        accessorKey: "status",
        Cell: ({ row }) => {
            const { classes } = useStyles({ status: row.original.status });
            return <Badge className={classes.status}>{row.original.status.name}</Badge>;
        },
    },
];

export const filterInitialValues: TransactionsFiltersForm = {
    query: "",
    entityType: "",
    paymentType: "",
    status: "",
    createdAtFrom: null,
    createdAtTo: null,
};
