import { GetMainBannerResponse, UpdateMainBannerRequest } from "@entities/staticPage";
import { UpdateMainBannerFormValidation } from "./types";

export const adaptDataForEditForm = (data?: GetMainBannerResponse): Partial<UpdateMainBannerFormValidation> => {
    return {
        indexBannerFile: data?.image,
        indexBannerAuthorAvatar: data?.authorImage,
        indexBannerTitle: data?.title,
        indexBannerSubTitle: data?.subTitle,
        indexBannerButtonText: data?.buttonText,
        indexBannerButtonLink: data?.buttonLink,
        indexBannerAuthorActive: !!data?.authorActive,
        indexBannerAuthorFirstName: data?.authorFirstName,
        indexBannerAuthorLastName: data?.authorLastName,
        indexBannerAuthorAbout: data?.authorAbout,
        indexBannerAuthorShortQuote: data?.authorShortQuote,
    };
};

export const adaptUpdateMainBannerRequest = (data: UpdateMainBannerFormValidation): UpdateMainBannerRequest => {
    const { indexBannerAuthorAvatar, indexBannerFile, ...rest } = data;
    return {
        ...rest,
        indexBannerImage: indexBannerFile?.id,
        indexBannerAuthorImage: indexBannerAuthorAvatar?.id,
    };
};
