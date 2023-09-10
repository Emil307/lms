import { AdminStaticReview, UpdateAdminStaticReviewRequest } from "@entities/staticReview";
import { UpdateAdminStaticReviewFormValidation } from "./types";

export const adaptDataForUpdateReviewForm = (staticReview: AdminStaticReview): Partial<UpdateAdminStaticReviewFormValidation> => {
    return {
        firstName: staticReview.firstName,
        lastName: staticReview.lastName,
        content: staticReview.content,
        quote: staticReview.quote || "",
        position: staticReview.position || "",
        authorIsActive: staticReview.authorIsActive,
        isActive: staticReview.isActive,
        preview: staticReview.preview,
        avatar: staticReview.authorAvatar,
        video: staticReview.video,
    };
};

export const adaptUpdateStaticReviewRequest = (data: UpdateAdminStaticReviewFormValidation): Omit<UpdateAdminStaticReviewRequest, "id"> => {
    const { avatar, video, preview, ...rest } = data;
    return {
        ...rest,
        authorAvatarId: avatar?.id,
        videoId: video?.id,
        previewId: preview?.id,
    };
};
