import { GetContactsResponse, UpdateContactsRequest } from "@entities/staticPage";

export const adaptDataForUpdateContactsForm = (data?: GetContactsResponse): Partial<UpdateContactsRequest> => {
    return {
        contactPageTitle: data?.title,
        contactPageRequisites: data?.requisites,
    };
};
