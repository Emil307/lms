import { MRT_ColumnDef } from "mantine-react-table";
import { AdminArticlePackageFromList } from "@entities/articlePackage";

export const columnOrder = ["mrt-row-select", "id", "name", "discountPrice"];

//TODO: Допилить колонку как беки поправят
export const columns: MRT_ColumnDef<AdminArticlePackageFromList>["columns"] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Курс",
        accessorKey: "name",
    },
    {
        header: "Стоимость",
        accessorKey: "discountPrice",
        accessorFn: ({ discountPrice }) => `${discountPrice.toLocaleString("ru")} ₽`,
    },
];
