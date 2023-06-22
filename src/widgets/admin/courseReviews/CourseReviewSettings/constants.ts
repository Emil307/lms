import { TInfoCardDisplayFields } from "@components/InfoCard";
import { CourseReviewCardInfoFields } from "./types";

export const fields: TInfoCardDisplayFields<CourseReviewCardInfoFields> = [
    { name: "fio", label: "ФИО" },
    { name: "courseName", label: "Название курса" },
    { name: "createdAt", label: "Дата отзыва" },
];
