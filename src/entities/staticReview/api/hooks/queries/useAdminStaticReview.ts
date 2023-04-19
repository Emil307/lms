import { useQuery } from "@tanstack/react-query";
import { staticReviewApi } from "@entities/staticReview";
import { QueryKeys } from "@shared/constant";

export const useAdminStaticReview = (id: string) => {
    return useQuery([QueryKeys.GET_ADMIN_STATIC_REVIEW, id], () => staticReviewApi.getStaticReview(id));
};
