import { TInfoCardDisplayFields } from "@components/InfoCard";
import { TLessonInfoCard } from "./types";

export const fields: TInfoCardDisplayFields<TLessonInfoCard> = [
    { name: "moduleName", label: "Модуль" },
    { name: "name", label: "Название урока" },
];
