import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { authorApi, GetAuthorsRequestParams } from "@entities/author";

export const useAuthors = (params: GetAuthorsRequestParams) => {
    return useQuery([QueryKeys.GET_AUTHORS, params], () => authorApi.getAuthors(params), {
        keepPreviousData: true,
        refetchOnMount: true,
    });
};
