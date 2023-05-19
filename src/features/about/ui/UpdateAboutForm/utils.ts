import { GetAboutResponse } from "@entities/staticPage";
import { UpdateAboutValidation } from "./types";

export const adaptDataForUpdateAboutForm = (data?: GetAboutResponse): Partial<UpdateAboutValidation> => {
    return {
        image: data?.banner,
        aboutPageTitle: data?.title,
        aboutPageShortContent: data?.shortContent,
        aboutPageFullContent: data?.fullContent,
    };
};
