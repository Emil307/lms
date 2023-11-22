import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetRandomCourseCollectionResponse } from "@entities/courseCollection";

export const useRandomCourseCollection = () => {
    return useQuery<GetRandomCourseCollectionResponse>([QueryKeys.GET_RANDOM_COURSE_COLLECTION], () =>
        courseCollectionApi.getRandomCourseCollection()
    );
};
