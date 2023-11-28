import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetRandomCourseCollectionResponse } from "@entities/courseCollection";
import { FormErrorResponse } from "@shared/types";

export const useRandomCourseCollection = (): UseQueryResult<GetRandomCourseCollectionResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_RANDOM_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION]], () =>
        courseCollectionApi.getRandomCourseCollection()
    );
};
