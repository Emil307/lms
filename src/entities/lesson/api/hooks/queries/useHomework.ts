import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetHomeworkRequest, lessonApi } from "@entities/lesson";

export const useHomework = ({ lessonId, courseId }: GetHomeworkRequest) => {
    return useQuery([QueryKeys.GET_LESSON_HOMEWORK, lessonId, courseId], () => lessonApi.getHomework({ lessonId, courseId }), {
        enabled: !!lessonId && !!courseId,
    });
};
