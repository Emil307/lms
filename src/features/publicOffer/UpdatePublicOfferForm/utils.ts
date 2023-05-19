import { GetPublicOfferResponse, UpdatePublicOfferRequest } from "@entities/staticPage";

export const adaptDataForUpdatePublicOfferForm = (data?: GetPublicOfferResponse): Partial<UpdatePublicOfferRequest> => {
    return {
        publicOfferContent: data?.content,
    };
};
