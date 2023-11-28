import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetContactsResponse, staticPageApi } from "@entities/staticPage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useContacts = (): UseQueryResult<GetContactsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_CONTACTS, [EntityNames.STATIC_CONTACT, EntityNames.USER]], () => staticPageApi.getContacts());
};
