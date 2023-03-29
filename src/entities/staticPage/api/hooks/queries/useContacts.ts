import { useQuery } from "@tanstack/react-query";
import { GetContactsResponse, staticPageApi } from "@entities/staticPage";
import { QueryKeys } from "@shared/constant";

export const useContacts = () => {
    return useQuery<GetContactsResponse>([QueryKeys.GET_CONTACTS], () => staticPageApi.getContacts());
};
