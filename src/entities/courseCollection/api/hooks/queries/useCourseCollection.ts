import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetCourseCollectionRequest, GetCourseCollectionResponse } from "@entities/courseCollection";
import { FormErrorResponse } from "@shared/types";

export const useCourseCollection = ({
    id,
}: GetCourseCollectionRequest): UseQueryResult<GetCourseCollectionResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE], id],
        () => courseCollectionApi.getCourseCollection({ id }),
        {
            enabled: !!id,
        }
    );
};
