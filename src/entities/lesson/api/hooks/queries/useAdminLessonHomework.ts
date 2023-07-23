import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { lessonApi } from "@entities/lesson";

export const useAdminLessonHomework = (lessonId: string) => {
    return useQuery([QueryKeys.GET_ADMIN_LESSON_HOMEWORK, lessonId], () => lessonApi.getAdminHomework(lessonId), { enabled: !!lessonId });
};
