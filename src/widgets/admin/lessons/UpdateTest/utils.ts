import { UpdateTestFormValues } from "./types";
import { UpdateAdminTestRequest } from "@entities/lesson";

export const adaptUpdateTestRequest = (data: UpdateTestFormValues, lessonId: string): UpdateAdminTestRequest => {
    const { correctAnswersCount, tasks } = data;

    return {
        lessonId,
        correctAnswersCount,
        tasks: tasks.map((task, index) => {
            return {
                order: index,
                content: task.content,
                answers: task.answers.map((answer, index) => ({
                    id: answer.id,
                    content: answer.content,
                    isCorrect: answer.isCorrect,
                    order: index,
                })),
            };
        }),
    };
};
