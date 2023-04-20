import { useQuery } from "@tanstack/react-query";
import { authorApi } from "@entities/author";
import { QueryKeys } from "@shared/constant";

export const useAuthor = (id: string) => {
    return useQuery([QueryKeys.GET_AUTHOR, id], () => authorApi.getAuthor(id));
};
