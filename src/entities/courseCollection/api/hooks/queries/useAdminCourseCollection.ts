import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetAdminCourseCollectionRequest, GetAdminCourseCollectionResponse } from "@entities/courseCollection";

export const useAdminCourseCollection = ({ id }: GetAdminCourseCollectionRequest) => {
    return useQuery<GetAdminCourseCollectionResponse>(
        [QueryKeys.GET_ADMIN_COURSE_COLLECTION, id],
        () => courseCollectionApi.getAdminCourseCollection({ id }),
        {
            enabled: !!id,
        }
    );
};
