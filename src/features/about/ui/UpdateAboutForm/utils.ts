import { GetAboutResponse } from "@entities/staticPage";
import { UpdateAboutValidation } from "./types";
import { initialValues } from "./constants";

export const adaptDataForUpdateAboutForm = (data?: GetAboutResponse): Partial<UpdateAboutValidation> => {
    return {
        image: data?.banner,
        aboutPageTitle: data?.title || initialValues.aboutPageTitle,
        aboutPageShortContent: data?.shortContent || initialValues.aboutPageShortContent,
        aboutPageFullContent: data?.fullContent || initialValues.aboutPageFullContent,
    };
};
