import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetTestPassRequest, lessonApi } from "@entities/lesson";

export const useTestPass = ({ lessonId, courseId }: GetTestPassRequest) => {
    return useQuery([QueryKeys.GET_LESSON_TEST_PASS, lessonId, courseId], () => lessonApi.getTestPass({ lessonId, courseId }), {
        enabled: !!lessonId && !!courseId,
    });
};
