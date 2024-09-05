import { TInfoCardDisplayFields } from "@components/InfoCard";
import { GetMainBannerResponse } from "@entities/staticPage";

export const fields: TInfoCardDisplayFields<GetMainBannerResponse> = [
    { name: "title", label: "Заголовок баннера" },
    {
        name: "buttonText",
        label: "Программириемая кнопка",
    },
];
