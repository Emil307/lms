import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetLessonByGroupRequest, GetLessonRequest, GetLessonResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";
import { GroupStatus } from "@entities/group";

interface UseLessonParams extends GetLessonRequest, GetLessonByGroupRequest {
    groupStatus?: GroupStatus["name"];
}

export const useLesson = ({
    id,
    courseId,
    groupId,
    groupStatus,
}: UseLessonParams): UseQueryResult<GetLessonResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_LESSON,
            [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.LESSON_TEST, EntityNames.MATERIAL],
            id,
            String(courseId),
            String(groupId),
            groupStatus,
        ],
        () => {
            if (groupId && groupStatus !== "inProgress") {
                return lessonApi.getLessonByGroup({ id, groupId });
            }
            return lessonApi.getLesson({ id, courseId });
        },
        {
            enabled: !!id && !!courseId,
        }
    );
};
