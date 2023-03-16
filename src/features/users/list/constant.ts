import { MRT_ColumnDef } from "mantine-react-table";
import { TUser } from "@entities/user/api/types";

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
        accessorKey: "role",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Статус",
        accessorKey: "isActive",
    },
];
