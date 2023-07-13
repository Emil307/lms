import { GetStaticReviewsRequest, StaticReviewFromList, staticReviewApi } from "@entities/staticReview";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useStaticReviews = (params: Omit<GetStaticReviewsRequest, "page">, enabled?: boolean) => {
    return useInfiniteRequest<StaticReviewFromList>(
        [QueryKeys.GET_STATIC_REVIEWS, params],
        ({ pageParam = 1 }) => staticReviewApi.getStaticReviews({ ...params, page: pageParam }),
        {
            enabled,
        }
    );
};
