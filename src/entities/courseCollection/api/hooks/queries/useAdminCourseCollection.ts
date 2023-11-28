import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { courseCollectionApi, GetAdminCourseCollectionRequest, GetAdminCourseCollectionResponse } from "@entities/courseCollection";
import { FormErrorResponse } from "@shared/types";

export const useAdminCourseCollection = ({
    id,
}: GetAdminCourseCollectionRequest): UseQueryResult<GetAdminCourseCollectionResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION, EntityNames.USER], id],
        () => courseCollectionApi.getAdminCourseCollection({ id }),
        {
            enabled: !!id,
        }
    );
};
