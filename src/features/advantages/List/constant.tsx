import { CSSObject, MantineTheme } from "@mantine/core";
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { Advantage } from "@entities/staticPage";

export const columnOrder = ["title", "description", "mrt-row-actions"];

export const columns: MRT_ColumnDef<Advantage>["columns"] = [
    {
        header: "Заголовок",
        accessorKey: "title",
    },
    {
        header: "Пояснение",
        accessorKey: "description",
    },
];

export const getStylesForCell = (theme: MantineTheme, _cell: MRT_Cell<Advantage>): CSSObject => {
    return {
        ":first-of-type": {
            position: "relative",
            ":before": {
                content: "''",
                position: "absolute",
                backgroundColor: theme.colors.light[0],
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
