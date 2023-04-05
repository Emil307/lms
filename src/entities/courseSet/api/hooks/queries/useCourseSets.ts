import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseSetApi, GetCourseSetsRequest, GetCourseSetsResponse } from "@entities/courseSet";

export const useCourseSets = (params: GetCourseSetsRequest) => {
    return useQuery<GetCourseSetsResponse>([QueryKeys.GET_COURSE_SETS, params], () => courseSetApi.getCourseSets(params));
};
