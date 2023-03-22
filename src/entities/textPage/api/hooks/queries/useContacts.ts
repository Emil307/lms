import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetContactsResponse, pageApi } from "@entities/textPage";

export const useContacts = () => {
    return useQuery<GetContactsResponse>([QueryKeys.GET_CONTACTS], () => pageApi.getContacts());
};
