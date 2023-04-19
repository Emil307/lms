import { AdminStaticReviewDetail, UpdateAdminStaticReviewRequest } from "@entities/staticReview";

export const adaptDataForEditReviewForm = (staticReview?: AdminStaticReviewDetail): Partial<UpdateAdminStaticReviewRequest> => {
    return {
        firstName: staticReview?.firstName,
        lastName: staticReview?.lastName,
        content: staticReview?.content,
        quote: staticReview?.quote || "",
        position: staticReview?.position || "",
        authorIsActive: !!staticReview?.firstName,
        isActive: !!staticReview?.isActive,
    };
};
