import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { AdminAuthorFromList, AdminAuthorsFiltersForm } from "@entities/author";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["id", "fullName", "createdAt", "mrt-row-actions"];

export const columns: TColumns<AdminAuthorFromList> = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "ФИО",
        id: "fullName",
        accessorKey: "lastName",
        accessorFn: (row) => {
            const fullName = [row.lastName, row.firstName, row.patronymic].join(" ");
            return (
                <Text sx={(theme) => ({ fontWeight: 500, fontSize: 14, lineHeight: "16px", color: theme.colors.dark[0] })}>{fullName}</Text>
            );
        },
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        accessorFn: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY"),
    },
];

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AdminAuthorsFiltersForm = { query: "", isActive: "" };
