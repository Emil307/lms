import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { authorApi, GetAdminAuthorsRequest } from "@entities/author";

export const useAuthors = (params: GetAdminAuthorsRequest) => {
    return useQuery([QueryKeys.GET_ADMIN_AUTHORS, params], () => authorApi.getAdminAuthors(params), {
        keepPreviousData: true,
        refetchOnMount: true,
    });
};
