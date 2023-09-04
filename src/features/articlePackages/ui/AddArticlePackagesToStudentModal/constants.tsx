import { AdminArticlePackageFromList } from "@entities/articlePackage";
import { TColumns } from "@shared/ui/DataGrid/types";

export const columnOrder = ["mrt-row-select", "id", "name", "discountPrice"];

//TODO: Допилить колонку как беки поправят
export const columns: TColumns<AdminArticlePackageFromList> = [
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
