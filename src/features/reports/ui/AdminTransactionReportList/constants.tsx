import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";
import { Badge } from "@mantine/core";
import { AdminTransactionReportFromList, AdminTransactionReportsFiltersForm } from "@entities/report";
import { getFullName } from "@shared/utils";
import { useCellStyles } from "./AdminTransactionReportList.styles";

export const columnOrder = ["fullName", "role", "entityName", "paidAt", "paymentType", "status", "amount"];

export const columns: MRT_ColumnDef<AdminTransactionReportFromList>["columns"] = [
    {
        header: "ФИО ученика",
        accessorKey: "user.profile",
        id: "fullName",
        size: 250,
        accessorFn: ({ user }) => getFullName({ data: user.profile }),
    },
    {
        header: "Тип ученика",
        accessorKey: "user.roles",
        id: "role",
        size: 250,
        accessorFn: ({ user }) => user.roles[0].displayName,
    },
    {
        header: "Название сущности",
        accessorKey: "entity.name",
        id: "entityName",
        size: 250,
    },

    {
        header: "Дата платежа",
        accessorKey: "paidAt",
        size: 250,
        accessorFn: ({ paidAt }) => dayjs(paidAt).format("DD.MM.YYYY"),
    },

    {
        header: "Тип платежа",
        accessorKey: "paymentType",
        size: 250,
        accessorFn: ({ paymentType }) => paymentType.name,
    },
    {
        header: "Статус платежа",
        accessorKey: "status",
        size: 164,
        Cell: ({ row }) => {
            const { classes } = useCellStyles({ status: row.original.status });
            return <Badge className={classes.status}>{row.original.status.name}</Badge>;
        },
    },
    {
        header: "Сумма оплат",
        accessorKey: "amount",
        size: 140,
        accessorFn: ({ amount }) => `${amount.toLocaleString("ru")} ₽`,
    },
];

export const filterInitialValues: AdminTransactionReportsFiltersForm = {
    transactionableType: "",
    transactionableIds: [],
    roleId: "",
    statuses: "",
    paymentTypes: "",
    createdAtFrom: null,
    createdAtTo: null,
};