import { CreateAdminStaticReviewRequest } from "@entities/staticReview";
import { CreateAdminStaticReviewFormValidation } from "./types";

export const adaptCreateStaticReviewRequest = (data: CreateAdminStaticReviewFormValidation): CreateAdminStaticReviewRequest => {
    const { avatar, video, preview, ...rest } = data;
    return {
        ...rest,
        authorAvatarId: avatar?.id,
        videoId: video?.id,
        previewId: preview?.id,
    };
};
