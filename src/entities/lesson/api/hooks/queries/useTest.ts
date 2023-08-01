import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetTestRequest, lessonApi } from "@entities/lesson";

export const useTest = ({ lessonId }: GetTestRequest) => {
    return useQuery([QueryKeys.GET_LESSON_TEST, lessonId], () => lessonApi.getTest({ lessonId }), { enabled: !!lessonId });
};
