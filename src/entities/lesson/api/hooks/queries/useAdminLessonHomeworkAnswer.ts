import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { lessonApi } from "@entities/lesson";

export const useAdminLessonHomeworkAnswer = (homeworkAnswerId: string) => {
    return useQuery(
        [QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWER, homeworkAnswerId],
        () => lessonApi.getAdminHomeworkAnswer(homeworkAnswerId),
        { enabled: !!homeworkAnswerId }
    );
};
