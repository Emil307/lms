import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { MantineTheme, CSSObject } from "@mantine/core";
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
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const getStylesForCell = (theme: MantineTheme, cell: MRT_Cell<TUser>): CSSObject => {
    return {
        ":first-of-type": {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                backgroundColor: cell.row.original.isActive ? theme.colors.done[0] : theme.colors.light[0],
                width: 4,
                borderRadius: "0 8px 8px 0",
                height: "100%",
                top: 1,
                bottom: 1,
                left: 0,
            },
        },
    };
};
