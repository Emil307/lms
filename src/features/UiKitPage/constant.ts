import {DataGridProps} from "mantine-data-grid";
import {TUser} from "./types";

export const columns: DataGridProps<TUser>["columns"] = [
    {
        header: "Имя",
        accessorFn: (row) => row.name,
    },
    {
        header: "Пароль",
        accessorFn: (row) => row.password,
    },
    {
        header: "Email",
        accessorFn: (row) => row.email,
    },
    {
        header: "Описание",
        accessorFn: (row) => row.description,
    },
];
