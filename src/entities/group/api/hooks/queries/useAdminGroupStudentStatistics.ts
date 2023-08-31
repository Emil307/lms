import { useQuery } from "@tanstack/react-query";
import { GetAdminGroupStudentStatisticsRequest, GetAdminGroupStudentStatisticsResponse, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useAdminGroupStudentStatistics = ({ groupId, studentId }: GetAdminGroupStudentStatisticsRequest) => {
    return useQuery<GetAdminGroupStudentStatisticsResponse>(
        [QueryKeys.GET_ADMIN_GROUP_STUDENT_STATISTICS, groupId, studentId],
        () => groupApi.getAdminGroupStudentStatistics({ groupId, studentId }),
        {
            enabled: !!groupId && !!studentId,
        }
    );
};
