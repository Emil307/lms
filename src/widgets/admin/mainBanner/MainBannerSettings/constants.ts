import { TInfoCardDisplayFields } from "@components/InfoCard";
import { GetMainBannerResponse } from "@entities/staticPage";

export const fields: TInfoCardDisplayFields<GetMainBannerResponse> = [
    { name: "title", label: "Заголовок баннера" },
    {
        name: "buttonText",
        label: "Программириемая кнопка",
    },
    {
        name: "authorShortQuote",
        label: "Карточка с цитатой",
        renderString: (_value, item) => (item?.authorShortQuote ? "Есть" : "Отсутствует"),
    },
];
