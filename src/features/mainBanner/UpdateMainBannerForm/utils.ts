import { GetMainBannerResponse } from "@entities/staticPage";
import { UpdateMainBannerFormValidation } from "./types";

export const adaptDataForEditForm = (data: GetMainBannerResponse): Partial<UpdateMainBannerFormValidation> => {
    return {
        indexBannerFile: data.image,
        indexBannerTitle: data.title,
        indexBannerSubTitle: data.subTitle,
        indexBannerButtonText: data.buttonText,
        indexBannerButtonLink: data.buttonLink,
    };
};
