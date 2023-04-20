import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { CSSObject, MantineTheme, Text } from "@mantine/core";
import { Author, AuthorsFilters } from "@entities/author";
import { getHumanDate } from "@shared/utils";

export const radioGroupValues = [
    { id: "1", label: "Все", value: "" },
    { id: "2", label: "Активен", value: "1" },
    { id: "3", label: "Не активен", value: "0" },
];

export const filterInitialValues: AuthorsFilters = { isActive: "", query: "" };

export const columnOrder = ["id", "fullName", "createdAt", "mrt-row-actions"];

export const columns: MRT_ColumnDef<Author>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "ФИО",
        accessorKey: "firstName",
        accessorFn: (row) => {
            const fullName = [row.firstName, row.lastName, row.patronymic].join(" ");
            return (
                <Text sx={(theme) => ({ fontWeight: 500, fontSize: 14, lineHeight: "16px", color: theme.colors.dark[0] })}>{fullName}</Text>
            );
        },
    },
    {
        header: "Дата создания",
        accessorKey: "createdAt",
        Cell: ({ cell }) => (
            <>
                {getHumanDate(cell.getValue() as Date, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </>
        ),
    },
];

export const getStylesForCell = (theme: MantineTheme, cell: MRT_Cell<Author>): CSSObject => {
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
