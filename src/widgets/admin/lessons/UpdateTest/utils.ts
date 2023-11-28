import { AdminTest, UpdateAdminTestRequest } from "@entities/lesson";
import { UpdateTestFormValues } from "./types";

export const getInitialValues = (test: AdminTest | null): UpdateTestFormValues => {
    if (!test) {
        return {
            correctAnswersCount: "",
            tasks: [],
        };
    }
    return {
        correctAnswersCount: String(test.correctAnswersCount),
        tasks: test.tasks,
    };
};

export const adaptUpdateTestRequest = (data: UpdateTestFormValues, lessonId: string): UpdateAdminTestRequest => {
    const { correctAnswersCount, tasks } = data;

    return {
        lessonId,
        correctAnswersCount: Number(correctAnswersCount),
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
