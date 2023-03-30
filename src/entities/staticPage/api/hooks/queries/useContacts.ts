import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetContactsResponse, staticPageApi } from "@entities/staticPage";

export const useContacts = () => {
    return useQuery<GetContactsResponse>([QueryKeys.GET_CONTACTS], () => staticPageApi.getContacts());
};
