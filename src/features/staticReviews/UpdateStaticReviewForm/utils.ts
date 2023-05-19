import { AdminStaticReview, UpdateAdminStaticReviewRequest } from "@entities/staticReview";

export const adaptDataForUpdateReviewForm = (staticReview?: AdminStaticReview): Partial<UpdateAdminStaticReviewRequest> => {
    return {
        firstName: staticReview?.firstName,
        lastName: staticReview?.lastName,
        content: staticReview?.content,
        quote: staticReview?.quote || "",
        position: staticReview?.position || "",
        authorIsActive: !!staticReview?.firstName,
        isActive: staticReview?.isActive,
        preview: staticReview?.preview,
        avatar: staticReview?.authorAvatar,
        video: staticReview?.video,
    };
};
