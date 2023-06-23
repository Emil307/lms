import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { lessonApi } from "@entities/lesson";

export const useAdminLesson = (id: string) => {
    return useQuery([QueryKeys.GET_ADMIN_LESSON, id], () => lessonApi.getAdminLesson(id), { enabled: !!id });
};
