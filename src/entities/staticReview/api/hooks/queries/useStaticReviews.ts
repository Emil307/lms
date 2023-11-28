import { GetStaticReviewsRequest, StaticReviewFromList, staticReviewApi } from "@entities/staticReview";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useStaticReviews = (params: Omit<GetStaticReviewsRequest, "page">, enabled?: boolean) => {
    return useInfiniteRequest<StaticReviewFromList>(
        [QueryKeys.GET_STATIC_REVIEWS, [EntityNames.STATIC_REVIEW, EntityNames.USER], params],
        ({ pageParam = 1 }) => staticReviewApi.getStaticReviews({ ...params, page: pageParam }),
        {
            enabled,
        }
    );
};
