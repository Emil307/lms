import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCourseReviewRequest, GetAdminCourseReviewResponse, courseReviewApi } from "@entities/courseReview";

export const useAdminCourseReview = ({ id }: GetAdminCourseReviewRequest) => {
    return useQuery<GetAdminCourseReviewResponse>(
        [QueryKeys.GET_ADMIN_COURSE_REVIEW, id],
        () => courseReviewApi.getAdminCourseReview({ id }),
        {
            enabled: !!id,
        }
    );
};
