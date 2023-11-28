import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminLessonResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useAdminLesson = (id: string): UseQueryResult<GetAdminLessonResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_LESSON, [EntityNames.LESSON, EntityNames.USER], id], () => lessonApi.getAdminLesson(id), {
        enabled: !!id,
    });
};
