import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetLessonRequest, lessonApi } from "@entities/lesson";

export const useLesson = ({ id, groupId }: GetLessonRequest) => {
    return useQuery([QueryKeys.GET_LESSON, id, groupId], () => lessonApi.getLesson({ id, groupId }), { enabled: !!id });
};
