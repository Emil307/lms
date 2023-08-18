import { MRT_ColumnDef } from "mantine-react-table";
import { UserFromList, UsersFilters } from "@entities/user/api/types";
import { getFullName } from "@shared/utils";

export const columns: MRT_ColumnDef<UserFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
        size: 140,
    },
    {
        header: "ФИО",
        accessorKey: "profile",
        id: "fullName",
        size: 339,
        accessorFn: ({ profile }) => getFullName({ data: profile }),
    },
    {
        header: "Роль",
        accessorKey: "roles",
        id: "roleName",
        size: 339,
        accessorFn: ({ roles }) => roles[0].displayName,
    },
    {
        header: "Email",
        accessorKey: "email",
        size: 339,
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        size: 140,
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: UsersFilters = { isActive: "", query: "", roleName: "" };
