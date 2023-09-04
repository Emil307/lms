import { UserFromList, UsersFilters } from "@entities/user/api/types";
import { getFullName } from "@shared/utils";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columns: TColumns<UserFromList> = [
    {
        header: "ID",
        accessorKey: "id",
        size: 120,
    },
    {
        header: "ФИО",
        accessorKey: "profile",
        id: "fullName",
        Cell: ({ cell }) => <>{getFullName({ data: cell.row.original.profile })}</>,
        size: 339,
    },
    {
        header: "Роль",
        accessorKey: "roles",
        id: "roleName",
        Cell: ({ cell }) => <>{cell.row.original.roles[0].displayName}</>,
        size: 339,
    },
    {
        header: "Email",
        accessorKey: "email",
        size: 339,
    },
    {
        header: "Статус",
        accessorKey: "isActive",
        Cell: ({ cell }) => <>{cell.getValue() ? "Активен" : "Неактивен"}</>,
        size: 339,
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: UsersFilters = { isActive: "", query: "", roleName: "" };
