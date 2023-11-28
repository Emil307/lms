import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminCourseReviewRequest, GetAdminCourseReviewResponse, courseReviewApi } from "@entities/courseReview";
import { FormErrorResponse } from "@shared/types";

export const useAdminCourseReview = ({
    id,
}: GetAdminCourseReviewRequest): UseQueryResult<GetAdminCourseReviewResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_COURSE_REVIEW, [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER], id],
        () => courseReviewApi.getAdminCourseReview({ id }),
        {
            enabled: !!id,
        }
    );
};
