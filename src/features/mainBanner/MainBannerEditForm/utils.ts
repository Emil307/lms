import { GetMainBannerResponse, UpdateMainBannerRequest } from "@entities/staticPage";

export const adaptDataForEditForm = (data?: GetMainBannerResponse): Partial<UpdateMainBannerRequest> => {
    return {
        indexBannerFile: data?.image,
        indexBannerAuthorAvatar: data?.authorImage,
        indexBannerTitle: data?.title,
        indexBannerSubTitle: data?.subTitle,
        indexBannerButtonText: data?.buttonText,
        indexBannerButtonLink: data?.buttonLink,
        indexBannerAuthorActive: data?.authorFirstName ? 1 : 0,
        indexBannerAuthorFirstName: data?.authorFirstName,
        indexBannerAuthorLastName: data?.authorLastName,
        indexBannerAuthorAbout: data?.authorAbout,
        indexBannerAuthorShortQuote: data?.authorShortQuote,
    };
};
