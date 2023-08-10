import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetTestRequest, lessonApi } from "@entities/lesson";

export const useTest = ({ lessonId, courseId }: GetTestRequest) => {
    return useQuery([QueryKeys.GET_LESSON_TEST, lessonId, courseId], () => lessonApi.getTest({ lessonId, courseId }), {
        enabled: !!lessonId && !!courseId,
    });
};
