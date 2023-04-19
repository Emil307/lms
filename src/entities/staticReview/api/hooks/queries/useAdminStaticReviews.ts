import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { GetAdminStaticReviewsRequest, staticReviewApi } from "@entities/staticReview";

export const useAdminStaticReviews = (params: GetAdminStaticReviewsRequest) => {
    const router = useRouter();
    return useQuery([QueryKeys.GET_ADMIN_STATIC_REVIEWS, params], () => staticReviewApi.getAdminStaticReviews(params), {
        keepPreviousData: true,
        enabled: router.isReady,
    });
};
