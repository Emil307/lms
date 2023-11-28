import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminGroupStudentStatisticsRequest, GetAdminGroupStudentStatisticsResponse, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminGroupStudentStatistics = ({
    groupId,
    studentId,
}: GetAdminGroupStudentStatisticsRequest): UseQueryResult<GetAdminGroupStudentStatisticsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_GROUP_STUDENT_STATISTICS,
            [
                EntityNames.GROUP,
                EntityNames.COURSE,
                EntityNames.LESSON,
                EntityNames.STUDENT,
                EntityNames.LESSON_TEST,
                EntityNames.LESSON_HOMEWORK,
                EntityNames.COURSE_MODULE,
            ],
            groupId,
            studentId,
        ],
        () => groupApi.getAdminGroupStudentStatistics({ groupId, studentId }),
        {
            enabled: !!groupId && !!studentId,
        }
    );
};
