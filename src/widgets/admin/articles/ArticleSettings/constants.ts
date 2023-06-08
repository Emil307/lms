import { TInfoCardDisplayFields } from "@components/InfoCard";
import { AdminArticle } from "@entities/article";

export const fields: TInfoCardDisplayFields<AdminArticle> = [
    {
        name: "name",
        label: "Статья",
    },
    { name: "category.name", label: "Категория" },
];
