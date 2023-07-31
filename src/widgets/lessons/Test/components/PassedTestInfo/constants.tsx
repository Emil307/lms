import { IconCircleCheck, IconCircleX, IconHelpCircle } from "@tabler/icons-react";

export const answerCounts = [
    { id: 1, description: "Пройдено верно", icon: <IconCircleCheck />, fieldName: "correctAnswersCount" },
    { id: 2, description: "Пройдено неверно", icon: <IconCircleX />, fieldName: "wrongAnswersCount" },
    { id: 3, description: "Порог прохождения", icon: <IconHelpCircle />, fieldName: "requiredAnswersCount" },
];
