import { TInfoCardDisplayFields } from "@components/InfoCard";
import { TLessonInfoCard } from "./types";

export const tabsList = [
    { id: 1, label: "Данные урока", value: "settings" },
    { id: 2, label: "Материалы", value: "materials" },
    { id: 3, label: "Тест", value: "test" },
    { id: 4, label: "Домашнее задание", value: "homework" },
];

export const fields: TInfoCardDisplayFields<TLessonInfoCard> = [
    { name: "moduleName", label: "Модуль" },
    { name: "name", label: "Название урока" },
];
