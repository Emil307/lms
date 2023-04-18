import { MRT_ColumnDef } from "mantine-react-table";
import { TUser, UsersFilters } from "@entities/user/api/types";

export const columns: MRT_ColumnDef<TUser>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "ФИО",
        accessorKey: "fullName",
    },
    {
        header: "Роль",
        accessorKey: "roleName",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Активен", value: "1" },
    { id: "2", label: "Не активен", value: "0" },
    { id: "3", label: "Все", value: "" },
];

export const filterInitialValues: UsersFilters = { isActive: "", query: "", roleName: "" };
