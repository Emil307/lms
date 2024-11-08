import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import {
    GetCourseCollectionsRequest,
    GetCourseCollectionsResponse,
    courseCollectionApi,
    GetAllCourseCollectionsResponse,
} from "@entities/courseCollection";
import { FormErrorResponse } from "@shared/types";

export const useCourseCollectionsPaginate = (
    params: GetCourseCollectionsRequest,
    enabled?: boolean
): UseQueryResult<GetCourseCollectionsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_COURSE_COLLECTIONS, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE], params],
        () => courseCollectionApi.getCourseCollectionsPaginate(params),
        {
            enabled,
        }
    );
};

export const useCourseCollections = (
    params: GetCourseCollectionsRequest,
    enabled?: boolean
): UseQueryResult<GetAllCourseCollectionsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_COURSE_COLLECTIONS, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE], params],
        () => courseCollectionApi.getCourseCollections(params),
        { enabled }
    );
};
