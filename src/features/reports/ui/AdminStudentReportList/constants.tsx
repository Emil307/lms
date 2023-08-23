import { MRT_ColumnDef } from "mantine-react-table";
import { AdminStudentReportFromList, AdminStudentReportsFiltersForm } from "@entities/report";
import { getFullName } from "@shared/utils";

export const columnOrder = ["fullName", "user.email", "role", "amount"];

export const columns: MRT_ColumnDef<AdminStudentReportFromList>["columns"] = [
    {
        header: "ФИО ученика",
        accessorKey: "user.profile",
        id: "fullName",
        accessorFn: ({ user }) => getFullName({ data: user.profile }),
    },
    {
        header: "Email",
        accessorKey: "user.email",
    },

    {
        header: "Тип ученика",
        accessorKey: "user.roles",
        id: "role",
        accessorFn: ({ user }) => user.roles[0].displayName,
    },
    {
        header: "Сумма оплат",
        accessorKey: "amount",
        accessorFn: ({ amount }) => `${amount.toLocaleString("ru")} ₽`,
    },
];

export const filterInitialValues: AdminStudentReportsFiltersForm = {
    transactionableType: "",
    transactionableIds: [],
    roleId: "",
    createdAtFrom: null,
    createdAtTo: null,
};
