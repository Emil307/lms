import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetRandomCourseCollectionRequest, GetRandomCourseCollectionResponse } from "@entities/courseCollection";

export const useRandomCourseCollection = (data: GetRandomCourseCollectionRequest) => {
    return useQuery<GetRandomCourseCollectionResponse>([QueryKeys.GET_RANDOM_COURSE_COLLECTION], () =>
        courseCollectionApi.getRandomCourseCollection(data)
    );
};
