import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetCourseCollectionRequest, GetCourseCollectionResponse } from "@entities/courseCollection";

export const useCourseCollection = ({ id }: GetCourseCollectionRequest) => {
    return useQuery<GetCourseCollectionResponse>(
        [QueryKeys.GET_COURSE_COLLECTION, id],
        () => courseCollectionApi.getCourseCollection({ id }),
        {
            enabled: !!id,
        }
    );
};
