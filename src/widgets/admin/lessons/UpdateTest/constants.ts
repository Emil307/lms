import { AdminTest } from "@entities/lesson";
import { UpdateTestFormValues } from "./types";

export const getInitialValues = (test: AdminTest | null): UpdateTestFormValues => {
    if (!test) {
        return {
            correctAnswersCount: 0,
            tasks: [],
        };
    }
    return {
        correctAnswersCount: test.correctAnswersCount,
        tasks: test.tasks,
    };
};
