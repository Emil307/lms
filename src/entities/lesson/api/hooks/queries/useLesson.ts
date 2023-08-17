import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetLessonRequest, GetLessonResponse, lessonApi } from "@entities/lesson";

export const useLesson = ({ id, courseId }: GetLessonRequest) => {
    return useQuery<GetLessonResponse>([QueryKeys.GET_LESSON, id, String(courseId)], () => lessonApi.getLesson({ id, courseId }), {
        enabled: !!id && !!courseId,
    });
};
