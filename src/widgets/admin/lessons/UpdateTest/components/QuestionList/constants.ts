import { AdminTestQuestion } from "@entities/lesson";

export const INITIAL_ANSWERS: AdminTestQuestion["answers"] = [
    {
        id: 1,
        order: 0,
        content: "",
        isCorrect: false,
    },
    {
        id: 2,
        order: 1,
        content: "",
        isCorrect: false,
    },
];
