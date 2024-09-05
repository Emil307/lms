import { AdminStudentReportFromList, AdminStudentReportsFiltersForm } from "@entities/report";
import { getFullName } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["fullName", "user.email", "role", "amount"];

export const columns: TColumns<AdminStudentReportFromList> = [
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
        header: "Сумма оплат",
        accessorKey: "amount",
        accessorFn: ({ amount }) => `${amount.toLocaleString("ru")} ₽`,
    },
];

export const filterInitialValues: AdminStudentReportsFiltersForm = {
    transactionableType: "",
    transactionableIds: [],
    createdAtFrom: null,
    createdAtTo: null,
};
