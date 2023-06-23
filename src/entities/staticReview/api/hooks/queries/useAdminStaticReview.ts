import { useQuery } from "@tanstack/react-query";
import { GetAdminStaticReviewRequest, staticReviewApi } from "@entities/staticReview";
import { QueryKeys } from "@shared/constant";

export const useAdminStaticReview = ({ id }: GetAdminStaticReviewRequest) => {
    return useQuery([QueryKeys.GET_ADMIN_STATIC_REVIEW, id], () => staticReviewApi.getAdminStaticReview({ id }), { enabled: !!id });
};
