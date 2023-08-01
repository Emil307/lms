import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetHomeworkRequest, lessonApi } from "@entities/lesson";

export const useHomework = ({ lessonId }: GetHomeworkRequest) => {
    return useQuery([QueryKeys.GET_LESSON_HOMEWORK, lessonId], () => lessonApi.getHomework({ lessonId }), { enabled: !!lessonId });
};
