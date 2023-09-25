import { CreateAdminStaticReviewRequest } from "@entities/staticReview";
import { CreateAdminStaticReviewFormValidation } from "./types";

export const adaptCreateStaticReviewRequest = (data: CreateAdminStaticReviewFormValidation): CreateAdminStaticReviewRequest => {
    const { avatar, video, preview, content, isActive, authorIsActive, ...rest } = data;
    return {
        videoId: video?.id,
        previewId: preview?.id,
        content,
        isActive,
        authorIsActive,
        ...(authorIsActive && {
            authorAvatarId: avatar?.id,
            ...rest,
        }),
    };
};
