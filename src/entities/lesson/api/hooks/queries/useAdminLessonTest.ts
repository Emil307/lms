import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { lessonApi } from "@entities/lesson";

export const useAdminLessonTest = (lessonId: string) => {
    return useQuery([QueryKeys.GET_ADMIN_LESSON_TEST, lessonId], () => lessonApi.getAdminTest(lessonId), { enabled: !!lessonId });
};
